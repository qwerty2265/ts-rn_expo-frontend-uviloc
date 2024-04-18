import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import styles from "./bottommenu.style";
import CustomText from "../CustomText"; // Предположительно это используется в другом месте вашего приложения
import Tracker from "../Tracker/Tracker";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTrackersByUserToken } from "../../slices/trackerSlice";
import { getData } from "../../utils/storage";
import { AppDispatch, RootState } from "../../state/store";
import { COLORS } from "../../constants";
import { UserData } from "../../types/user";

const Devices = () => {
    const { trackers, loading, error } = useSelector((state: RootState) => state.trackers);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchToken = async () => {
            console.log('fetching');
            const access_token = await getData('access_token');
            if (typeof access_token === 'string' || access_token === null) {
                setAccessToken(access_token);
            } else {
                console.error("Received non-string access token:", access_token);
            }
        };
        fetchToken();
    }, []);

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchTrackersByUserToken({ access_token: accessToken }));
        }
    }, [accessToken, dispatch]);

    if (loading) {
        return <ActivityIndicator style={{ flex: 1, backgroundColor: COLORS.background }} size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error loading trackers: {error}</Text>;
    }

    return (
        <ScrollView style={styles.bottomMenuPage} contentContainerStyle={{ flexGrow: 1 }}>
            {trackers.map(tracker => (
                <Tracker
                key={tracker.id}
                name={tracker.name}
                lastTimeSeen={tracker.updated_at}
                location={''}
                distance={''}                />
            ))}
        </ScrollView>
    );
}

export default Devices;
