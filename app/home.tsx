import Map from "../components/Map/Map";
import { COLORS } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
    return (
        <SafeAreaView style={{backgroundColor: COLORS.background, flex: 1}}>
            <Map />
        </SafeAreaView>
    )
}

export default Home;
