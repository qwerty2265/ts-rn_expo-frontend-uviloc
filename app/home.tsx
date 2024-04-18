import { useSelector } from "react-redux";
import BottomMenu from "../components/BottomMenu/BottomMenu";
import Map from "../components/Map/Map";
import { COLORS } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootState } from "../state/store";
import { useEffect } from "react";

const Home = () => {
    const { trackers } = useSelector((state: RootState) => state.trackers);

    useEffect(() => {}, [trackers]);
    
    return (
        <SafeAreaView style={{backgroundColor: COLORS.background, flex: 1}}>
            <Map />
            <BottomMenu />
        </SafeAreaView>
    )
}

export default Home;
