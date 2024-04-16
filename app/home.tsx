import { useDispatch, useSelector } from "react-redux";
import BottomMenu from "../components/BottomMenu/BottomMenu";
import Map from "../components/Map/Map";
import { COLORS } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppDispatch, RootState } from "../state/store";
import { useEffect } from "react";
import { fetchTrackersByUsername } from "../slices/trackerSlice";

const Home = () => {
    const { trackers, loading, error } = useSelector((state: RootState) => state.trackers);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchTrackersByUsername({ username: 'chel1' }));
    }, [dispatch]);

    useEffect(() => {
        console.log(trackers);
    }, [trackers])

    return (
        <SafeAreaView style={{backgroundColor: COLORS.background, flex: 1}}>
            <Map />
            <BottomMenu />
        </SafeAreaView>
    )
}

export default Home;
