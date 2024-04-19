import { ActivityIndicator, ScrollView, Alert } from "react-native";
import styles from "./bottommenu.style";
import Tracker from "../Tracker/Tracker";
import { useEffect, useState } from "react";
import { fetchTrackersByUserToken, resetTrackers } from "../../slices/trackerSlice";
import { getData } from "../../utils/storage";
import { useDispatch, useSelector } from "../../state/store";
import { COLORS } from "../../constants";

const Devices = () => {
    const { trackers, loading, error } = useSelector((state) => state.trackers);
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
    }, []);

    useEffect(() => {
        dispatch(resetTrackers());
    }, [userData, dispatch]);

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchTrackersByUserToken({ access_token: accessToken }));
        }
    }, [accessToken, dispatch]);

    if (loading) {
        return <ActivityIndicator style={{ flex: 1, backgroundColor: COLORS.background }} size="large" color="#0000ff" />;
    }

    if (error) {
        console.log("Error received:", error);
        Alert.alert(
            "Error",
            `Error loading trackers: ${error}`,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
        );
    }

    return (
        <ScrollView style={styles.bottomMenuPage} contentContainerStyle={{ flexGrow: 1 }}>
            {trackers.map(tracker => (
                <Tracker
                key={tracker.token}
                name={tracker.name}
                lastTimeSeen={tracker.updated_at}
                location={''}
                distance={''}                />
            ))}
        </ScrollView>
    );
}

export default Devices;
