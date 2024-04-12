import { Text, TextStyle } from "react-native"
import { COLORS, FONT } from "../constants";
import { ReactNode } from "react";

interface CustomTextProps {
    bold?: boolean;
    style?: TextStyle;
    children: ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({ bold, style, children }) => {
    const fontFamily = bold ? FONT.bold : FONT.regular;

    return (
        <Text style={[{ fontFamily, color: COLORS.text }, style]}>
            {children}
        </Text>
    );
}

export default CustomText;