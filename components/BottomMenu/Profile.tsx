import { View } from "react-native";
import styles from "./bottommenu.style";
import CustomText from "../CustomText";
import { COLORS } from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import LabeledTextInput from "../LabeledTextInput";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const Profile = () => {
	const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
	const { login } = useAuth();

	const handleLogin = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/users/`, {
                "username": username,
				"password": password,
            });

			if (response.data.access_token) {
				login(response.data.access_token);
			} 
			else {
				console.error('Login failed: No access token received');
			}            
        } 
		catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
            } else {
                console.error('Unexpected error:', error);
			}
        }
    }


	return (
		<View style={styles.bottomMenuPage}>
			<View style={styles.profileForm}>
				<LabeledTextInput 
					label="Username"
					placeholder="Enter your username..."
					onChangeText={setUsername}
					value={username}
				/>

				<LabeledTextInput 
					label="Password"
					placeholder="Enter your password..."
					secureTextEntry={true}
					onChangeText={setPassword}
					value={password}
				/>

				<TouchableOpacity
					style={styles.profileFormButton}
					onPress={handleLogin}
				>
					<CustomText color={COLORS.background}>Login</CustomText>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default Profile;