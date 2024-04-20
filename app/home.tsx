import { useSelector } from "react-redux";
import BottomMenu from "../components/BottomMenu/BottomMenu";
import Map from "../components/Map/Map";
import { COLORS } from "../constants";
import { RootState } from "../state/store";
import { useEffect } from "react";
import { View } from "react-native";

const Home = () => {
    const { trackers } = useSelector((state: RootState) => state.trackers);

    useEffect(() => {}, [trackers]);
    
    return (
        <View style={{backgroundColor: COLORS.background, flex: 1}}>
            <Map />
            <BottomMenu />
        </View>
    )
}

export default Home;
