import { ScrollView, Alert, View } from "react-native";
import styles from "./bottommenu.style";
import Tracker from "../Tracker/Tracker";
import { useEffect, useState } from "react";
import { clearError, fetchTrackersByUserToken, resetTrackers } from "../../slices/trackerSlice";
import { getData } from "../../utils/storage";
import { useDispatch, useSelector } from "../../state/store";
import { SIZE } from "../../constants";
import { convertUTCToLocalTime, parseCoordinates } from "../../utils/common";
import { calculateDistance } from "../../utils/coordinates";
import { CustomActivityIndicator } from "../CustomActivityIndicator";

const Devices = () => {
    const { trackers, loading, error } = useSelector((state) => state.trackers);
    const userLocation = useSelector((state) => state.location.userLocation);
    const userData = useSelector((state) => state.auth.userData);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const dispatch = useDispatch();

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

    if (loading || !userLocation) {
        return <CustomActivityIndicator style={{ flex: 1}} size='small' />
    }

    if (error) {
        console.log("Error received:", error);
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
