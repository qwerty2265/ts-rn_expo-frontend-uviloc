import { Platform, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

const Map = () => {
    return (
        <View>
        {Platform.OS !== 'web' && (
            <MapView 
                style={{
                    width: '100%',
                    height: '50%',
                }} 
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0,
                    longitudeDelta: 0,
                }}
            />
        )}
      </View>
    )
}

export default Map;
