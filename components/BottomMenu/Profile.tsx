import { View } from "react-native";
import styles from "./bottommenu.style";
import { useAuth } from "../../context/AuthContext";
import CustomText from "../CustomText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZE } from "../../constants";
import { NavigationProp } from "@react-navigation/native";

const Profile = ({ navigation } : { navigation : NavigationProp<any> }) => {
	const { userData, logout } = useAuth();

	const handleLogout = async () => {
		logout();
		navigation.navigate('auth');
    }

	return (
		<View style={styles.bottomMenuPage}>
			<CustomText bold>{userData?.username}</CustomText>

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