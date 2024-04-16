import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Devices from "./Devices";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./bottommenu.style";
import BottomMenuNavigator from "./BottomMenuNavigator";
import { useNavigation } from "@react-navigation/native";
import { Pressable, View } from "react-native";
import { COLORS, icons } from "../../constants";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();

const BottomMenu = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.bottomMenu} >
            <BottomMenuNavigator>
                <Tab.Screen options={{
                    headerRight: () => (
                        <Pressable 
                            style={{ backgroundColor: 'transparent'}}
                            // @ts-expect-error
                            onPress={() => navigation.navigate('qr-scanner')}
                        >
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
        </View>
    )
}

export default BottomMenu;