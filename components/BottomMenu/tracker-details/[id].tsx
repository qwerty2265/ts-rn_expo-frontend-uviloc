import { View } from "react-native";
import { COLORS, Z_INDEX } from "../../../constants";
import styles from "../bottommenu.style";

const TrackerDetails = () => {
    return (
        <View style={[styles.bottomMenu, {zIndex: Z_INDEX.content_2}]}>
            <View style={styles.bottomMenuPage}>

            </View>
        </View>
    )
}

export default TrackerDetails;