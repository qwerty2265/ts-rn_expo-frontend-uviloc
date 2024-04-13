import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Devices from "./Devices";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./bottommenu.style";
import Profile from "./Profile";
import BottomMenuNavigator from "./BottomMenuNavigator";

const Tab = createBottomTabNavigator();

const BottomMenu = () => {
    return (
        <SafeAreaView style={styles.bottomMenu} >
            <BottomMenuNavigator>
                <Tab.Screen name='Devices' component={Devices} />
                <Tab.Screen name='Profile' component={Profile} />
            </BottomMenuNavigator>
        </SafeAreaView>    
    )
}

export default BottomMenu;