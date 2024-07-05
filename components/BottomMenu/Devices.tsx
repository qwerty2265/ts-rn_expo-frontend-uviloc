import { ScrollView, Alert, View, TouchableOpacity, Platform } from "react-native";
import styles from "./bottommenu.style";
import Tracker from "../Tracker/Tracker";
import { useEffect, useRef, useState } from "react";
import { clearError, fetchTrackersByUserToken, resetTrackers } from "../../slices/trackerSlice";
import { getData } from "../../utils/storage";
import { useDispatch, useSelector } from "../../state/store";
import { COLORS, SIZE } from "../../constants";
import { convertUTCToLocalTime, parseCoordinates } from "../../utils/common";
import { calculateDistance } from "../../utils/coordinates";
import { CustomActivityIndicator } from "../CustomActivityIndicator";
import * as Location from 'expo-location';
import CustomText from "../CustomText";
import { setSelectedTracker } from "../../slices/selectedTrackerSlice";
import { registerForPushNotificationsAsync, schedulePushNotification } from "../../utils/notifications"; // Import the refactored function
import * as Notifications from 'expo-notifications';

const Devices = () => {
    const { trackers, loading, error } = useSelector((state) => state.trackers);
    const userLocation = useSelector((state) => state.location.userLocation);
    const userData = useSelector((state) => state.auth.userData);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [locationPermissionDenied, setLocationPermissionDenied] = useState<boolean>(false);
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    const dispatch = useDispatch();

    // Notifications logic
    
    useEffect(() => {
        registerForPushNotificationsAsync(); // Register for push notifications
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            // Handle received notification
            console.log("Notification received:", notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            // Handle notification response
            console.log("Notification response received:", response);
        });
    
        return () => {
            notificationListener.current &&
                Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current &&
                Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {
        if (trackers.length > 0) {
            trackers.forEach(tracker => {
                const lastTimeSeen = new Date(tracker.latest_geolocation.created_at);
                const currentTime = new Date();
                const differenceInMinutes = (currentTime.getTime() - lastTimeSeen.getTime()) / (1000 * 60);
                
                if (differenceInMinutes > 60) {
                    schedulePushNotification({
                        title: `Tracker ${tracker.name} Disconnected`,
                        body: `The tracker ${tracker.name} hasn't been seen for over an hour.`,
                        data: { trackerId: tracker.id }
                    });
                }
            });
        }
    }, [trackers]);

    // Trackers logic

    useEffect(() => {
        const fetchToken = async () => {
            const access_token = await getData('access_token');
            if (typeof access_token === 'string' || access_token === null) {
                setAccessToken(access_token);
            } else {
                console.error("Received non-string access token:", access_token);
            }
        };
        fetchToken();
    }, [userData]);

    useEffect(() => {
        dispatch(resetTrackers());
    }, [userData, dispatch]);

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchTrackersByUserToken({ access_token: accessToken }));

            const intervalId = setInterval(() => {
                dispatch(fetchTrackersByUserToken({ access_token: accessToken }));
            }, 20000);
    
            return () => clearInterval(intervalId);
        }
    }, [accessToken, dispatch]);

    const handleTrackerPress = (trackerId: number, coordinates: string) => {
        dispatch(setSelectedTracker({ selectedTrackerId: trackerId, selectedTrackerCoordinates: coordinates }));
    }

    // everything else

    useEffect(() => {
        const checkPermissionAndFetchLocation = async () => {
            let { status } = await Location.getForegroundPermissionsAsync();
            if (status !== 'granted') setLocationPermissionDenied(true);
        };

        checkPermissionAndFetchLocation();
    }, []);


    if (locationPermissionDenied) {
        return <CustomText style={{flex: 1, backgroundColor: COLORS.background}}>Permission to access location was denied</CustomText>
    }

    if (loading || !userLocation) {
        return <CustomActivityIndicator style={{ flex: 1 }} size='small' />
    }

    if (error) {
        Alert.alert(
            "Error",
            `Error loading trackers: ${error}`,
            [{ text: "OK", onPress: () => {
                console.log("OK Pressed")
                dispatch(clearError());
            }}],
            { cancelable: false }
        );
    }

    switch(trackers.length > 0) {
        case true:
            return (
                <ScrollView style={styles.bottomMenuPage} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
                    {trackers.map((tracker, index) => (
                        <TouchableOpacity 
                            key={tracker.token} 
                            style={index !== 0 && { marginTop: SIZE.small }}
                            onPress={() => handleTrackerPress(tracker.id, tracker.latest_geolocation.coordinates)}
                        >
                            <Tracker
                                name={tracker.name}
                                lastTimeSeen={convertUTCToLocalTime(tracker.latest_geolocation.created_at)}
                                location={''}
                                distance={calculateDistance(userLocation, parseCoordinates(`${tracker.latest_geolocation.coordinates}`) )}               
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            );
        case false:
            return (
                <View style={styles.bottomMenuPage}>
                    <CustomText style={{ margin: 'auto' }} color={COLORS.primary} size={SIZE.small}> 
                        You don't have any connected trackers 
                    </CustomText>
                </View>
            )
    }


}

export default Devices;
