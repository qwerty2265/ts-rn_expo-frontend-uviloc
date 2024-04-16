import { View } from "react-native";
import styles from "./bottommenu.style";
import CustomText from "../CustomText";
import { COLORS } from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import LabeledTextInput from "../LabeledTextInput";

const Profile = () => {


	return (
		<View style={styles.bottomMenuPage}>
			<View style={styles.profileForm}>
				<LabeledTextInput 
					label="Username"
					placeholder="Enter your username..."
				/>

				<LabeledTextInput 
					label="Password"
					placeholder="Enter your password..."
					secureTextEntry={true}
				/>

				<TouchableOpacity
					style={styles.profileFormButton}
				>
					<CustomText color={COLORS.background}>Login</CustomText>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default Profile;