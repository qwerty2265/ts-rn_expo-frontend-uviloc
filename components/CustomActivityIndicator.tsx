import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { COLORS } from "../constants";

interface CustomActivityIndicatorProps extends ActivityIndicatorProps{
    size?: 'large' | 'small'; 
}

const CustomActivityIndicator: React.FC<CustomActivityIndicatorProps> = ({ size }) => {
    return <ActivityIndicator style={{ flex: 1, backgroundColor: COLORS.background }} size={size} color={COLORS.accent} />;
}

export { CustomActivityIndicator }