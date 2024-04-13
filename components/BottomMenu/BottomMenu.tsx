import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Devices from "./Devices";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./bottommenu.style";
import Profile from "./Profile";
import { BlurView } from "expo-blur";
import { COLORS, FONT, icons } from "../../constants";

const Tab = createBottomTabNavigator();

const BottomMenu = () => {
    return (
        <SafeAreaView style={styles.bottomMenu} >
            <BlurView intensity={100} style={{ flex: 1 }}>
                <Tab.Navigator 
                    screenOptions={({ route }) => ({
                        headerShown: false,
                        tabBarStyle: {
                            borderTopWidth: 0.5,
                            borderColor: COLORS.primary,
                            backgroundColor: COLORS.background,
                        },
                        tabBarInactiveTintColor: COLORS.text,
                        tabBarActiveTintColor: COLORS.accent,
                        tabBarLabelStyle: {
                            fontFamily: FONT.bold,
                        },
                        tabBarIcon: ({ focused, size }) => {
                            let iconComponent;
                            let tabColor = focused ? COLORS.accent : COLORS.text;

                            switch(route.name) {
                                case 'Devices':
                                    iconComponent = <icons.devices width={size} height={size} fill={tabColor} /> 
                                    break;
                                case 'Profile':
                                    iconComponent = <icons.profile width={size} height={size} fill={tabColor} /> 
                                    break;
                                default:
                                    break;
                            }

                            return iconComponent;
                        },
                    })}
                >
                    <Tab.Screen name='Devices' component={Devices} />
                    <Tab.Screen name='Profile' component={Profile} />
                </Tab.Navigator>
            </BlurView>
        </SafeAreaView>    
    )
}

export default BottomMenu;