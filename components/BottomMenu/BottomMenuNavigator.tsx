import { ReactNode } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS, FONT, icons } from "../../constants";
import { Pressable } from "react-native";

interface BottomMenuNavigatorProps {
    children: ReactNode;
}

const Tab = createBottomTabNavigator();

const BottomMenuNavigator: React.FC<BottomMenuNavigatorProps> = ({ children }) => {
    return (
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
        {children}
    </Tab.Navigator>
    )
}

export default BottomMenuNavigator;