import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import Home from "./home";
import QrScanner from "./qr-scanner";
import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { COLORS } from "../constants";

const Stack = createStackNavigator();

const Layout = () => {
    const [loaded, error] = useFonts({
        SMBold: require("../assets/fonts/SpaceMono-Bold.ttf"),
        SMRegular: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);
    
    if (!loaded) {
        return null;
    }

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName='home'
            >
                <Stack.Screen name='home' options={{ headerShown: false}} component={Home}/>
                <Stack.Screen 
                    name='qr-scanner'
                    options={{
                        headerShown: true,
                        headerTitle: '',
                        headerStyle: {
                            backgroundColor: COLORS.background,
                            shadowOffset: {
                                width: 0, height: 0
                            },
                            elevation: 0,
                            borderBottomWidth: 0.5,
                            borderBottomColor: COLORS.secondary,
                        },
                        headerTintColor: COLORS.secondary,
                        headerBackTitle: 'Back',
                        presentation: 'modal' 
                    }} 
                    component={QrScanner}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Layout;