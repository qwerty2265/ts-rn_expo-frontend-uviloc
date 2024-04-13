import { View } from "react-native";
import styles from "./bottommenu.style";
import CustomText from "../CustomText";
import { icons } from "../../constants";

const Devices = () => {
    return (
        <View style={styles.bottomMenuPage}>
            <CustomText>
                Devices
            </CustomText>
            
        </View>
    )
}

export default Devices;