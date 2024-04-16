import { Image, StyleSheet, TextInput, View } from "react-native";
import styles from "./bottommenu.style";
import CustomText from "../CustomText";
import { COLORS, FONT, icons } from "../../constants";
import CustomTextInput from "../CustomTextInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import LabeledTextInput from "../LabeledTextInput";



const Profile = () => {
	return (
		<View style={styles.bottomMenuPage}>
			<LabeledTextInput 
				style={styles.profileForm}
				label="Username"
				placeholder="Enter your username..."
			/>

			<LabeledTextInput 
				style={styles.profileForm}
				label="Password"
				placeholder="Enter your password..."
				secureTextEntry={true}
			/>

			<TouchableOpacity
                style={[styles.profileForm, styles.profileFormButton]}
            >
                <CustomText color={COLORS.background}>Login</CustomText>
            </TouchableOpacity>
		</View>
	)
}

export default Profile;