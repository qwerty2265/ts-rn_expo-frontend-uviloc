import { View } from "react-native";
import styles from "./bottommenu.style";
import CustomText from "../CustomText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZE } from "../../constants";
import { NavigationProp } from "@react-navigation/native";

const Profile = ({ navigation } : { navigation : NavigationProp<any> }) => {
	const handleLogout = async () => {
		navigation.navigate('auth');
    }

	return (
		<View style={styles.bottomMenuPage}>
			<CustomText bold>{''}</CustomText>

			<TouchableOpacity
                style={{
					width: '50%',
					maxWidth: 100,
                    marginTop: SIZE.medium,
                    backgroundColor: COLORS.accentRed,
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                }}
                onPress={handleLogout}
            >
                <CustomText color={COLORS.background}>Sign out</CustomText>
            </TouchableOpacity>
		</View>
	)
}

export default Profile;