import { ScrollView, Alert, View } from "react-native";
import styles from "./bottommenu.style";
import Tracker from "../Tracker/Tracker";
import { useEffect, useState } from "react";
import { clearError, fetchTrackersByUserToken, resetTrackers } from "../../slices/trackerSlice";
import { getData } from "../../utils/storage";
import { useDispatch, useSelector } from "../../state/store";
import { COLORS, SIZE } from "../../constants";
import { convertUTCToLocalTime, parseCoordinates } from "../../utils/common";
import { calculateDistance } from "../../utils/coordinates";
import { CustomActivityIndicator } from "../CustomActivityIndicator";
import * as Location from 'expo-location';
import CustomText from "../CustomText";

const Devices = () => {
    const { trackers, loading, error } = useSelector((state) => state.trackers);
    const userLocation = useSelector((state) => state.location.userLocation);
    const userData = useSelector((state) => state.auth.userData);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [locationPermissionDenied, setLocationPermissionDenied] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkPermissionAndFetchLocation = async () => {
            let { status } = await Location.getForegroundPermissionsAsync();
            if (status !== 'granted') setLocationPermissionDenied(true);
        };

        checkPermissionAndFetchLocation();
    }, []);

    useEffect(() => {
        const fetchToken = async () => {
            const access_token = await getData('access_token');
            console.log(accessToken)
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

    if (locationPermissionDenied) {
        return <CustomText style={{flex: 1, backgroundColor: COLORS.background}}>Permission to access location was denied</CustomText>
    }

    if (loading || !userLocation) {
        return <CustomActivityIndicator style={{ flex: 1}} size='small' />
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

    return (
        <ScrollView style={styles.bottomMenuPage} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
            {trackers.map((tracker, index) => (
                <View key={tracker.token} style={index !== 0 && { marginTop: SIZE.small }}>
                    <Tracker
                        name={tracker.name}
                        lastTimeSeen={convertUTCToLocalTime(tracker.latest_geolocation.created_at)}
                        location={''}
                        distance={calculateDistance(userLocation, parseCoordinates(`${tracker.latest_geolocation.coordinates}`) )}               
                    />
                </View>
            ))}
        </ScrollView>
    );
}

export default Devices;
