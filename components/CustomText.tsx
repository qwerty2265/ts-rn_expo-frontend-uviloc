import { Text, TextProps, TextStyle } from "react-native";
import { COLORS, FONT } from "../constants";
import { ReactNode } from "react";

interface CustomTextProps extends TextProps{
    bold?: boolean;
    style?: TextStyle;
    size?: number; 
    color?: string;
    children: ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({ bold, style, color = COLORS.text, children, ...props}) => {
    const fontFamily = bold ? FONT.bold : FONT.regular;

    return (
        <Text 
            style={[{ fontFamily, color }, style]} 
            {...props}
        >
            {children}
        </Text>
    );
}

export default CustomText;