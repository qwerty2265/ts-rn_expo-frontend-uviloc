import BottomMenu from "../components/BottomMenu/BottomMenu";
import Map from "../components/Map/Map";
import { COLORS } from "../constants";
import { RootState, useDispatch, useSelector } from "../state/store";
import { useEffect } from "react";
import { View } from "react-native";
import { fetchUserLocation } from "../slices/locationSlice";

const Home = () => {
    const trackers = useSelector((state) => state.trackers.trackers);

    const dispatch = useDispatch();

    useEffect(() => {}, [trackers]);

    useEffect(() => {dispatch(fetchUserLocation())}, []);
    
    return (
        <View style={{backgroundColor: COLORS.background, flex: 1}}>
            <Map />
            <BottomMenu />
        </View>
    )
}

export default Home;
