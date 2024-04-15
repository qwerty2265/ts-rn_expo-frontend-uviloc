import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Devices from "./Devices";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./bottommenu.style";
import BottomMenuNavigator from "./BottomMenuNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Pressable } from "react-native";
import { COLORS, icons } from "../../constants";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();

const BottomMenu = () => {
    return (
        <NavigationContainer independent={true}>
            <SafeAreaView style={styles.bottomMenu} >
                <BottomMenuNavigator>
                    <Tab.Screen options={{
                        headerRight: () => (
                            <Pressable style={{ backgroundColor: 'transparent'}}>
                                {({ pressed }) => (
                                    <icons.plus 
                                        style={{ marginRight: 15, marginBottom: 30, opacity: pressed ? 0.5 : 1 }}
                                        height={25} 
                                        width={25} 
                                        stroke={COLORS.secondary} 
                                    />
                                )}                  
                            </Pressable>
                        ),
                    }}
                    name='Devices' 
                    component={Devices} />
                    <Tab.Screen name='Profile' component={Profile} />
                </BottomMenuNavigator>
            </SafeAreaView>    
        </NavigationContainer>
    )
}

export default BottomMenu;