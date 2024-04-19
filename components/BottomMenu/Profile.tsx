import { View } from "react-native";
import styles from "./bottommenu.style";
import CustomText from "../CustomText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZE } from "../../constants";
import { NavigationProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "../../state/store";
import { logout } from "../../slices/authSlice";
import { useEffect } from "react";

const Profile = ({ navigation } : { navigation : NavigationProp<any> }) => {
    const dispatch = useDispatch();
    const userData = useSelector((store) => store.auth.userData);

	const handleLogout = async () => {
        dispatch((logout()));
		navigation.navigate('auth');
    }
    
    useEffect(() => {console.log(userData)});

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