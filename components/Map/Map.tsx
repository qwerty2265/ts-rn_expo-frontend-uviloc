import MapView, { Marker } from "react-native-maps";
import styles from "./map.style";
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { COLORS, MAP_THEME, icons } from "../../constants";
import { useDispatch, useSelector } from "../../state/store";
import { CustomActivityIndicator } from "../CustomActivityIndicator";
import CustomText from "../CustomText";
import { convertUTCToLocalTime, formatLastTimeSeen, parseCoordinates } from "../../utils/common";

interface MapRegionState {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}

const Map = () => {
    const [mapRegion, setMapRegion] = useState<MapRegionState | null>(null);
    const [locationPermissionDenied, setLocationPermissionDenied] = useState<boolean>(false);
    const userLocation = useSelector((state) => state.location.userLocation);
    const trackers = useSelector((state) => state.trackers.trackers);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkPermissionAndFetchLocation = async () => {
            let { status } = await Location.getForegroundPermissionsAsync();
            if (status !== 'granted') setLocationPermissionDenied(true);
        };

        checkPermissionAndFetchLocation();
    }, []);

    useEffect(() => {
        if (!mapRegion && userLocation) {
            setMapRegion({
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.05,
            });
        }
    }, [mapRegion, userLocation]);
    
    if (locationPermissionDenied) {
        return null;
    }

    if (!mapRegion) {
        return <CustomActivityIndicator style={{height: '60%'}} size='large' />;
    }
    
    return (
        <MapView style={styles.mapContainer}
            region={mapRegion}
            customMapStyle={MAP_THEME}
            showsUserLocation={true}
            showsMyLocationButton={true}
            userLocationUpdateInterval={10000}
            loadingEnabled={true}
        >
            {trackers.map((tracker) => (
                <Marker
                    key={tracker.token}
                    coordinate={parseCoordinates(tracker.latest_geolocation.coordinates)}
                    title={tracker.name}   
                >
                    <icons.tracker
                        height={30}
                        width={30}
                        fill={formatLastTimeSeen(convertUTCToLocalTime(tracker.latest_geolocation.created_at)) === "Now" ? COLORS.accent : COLORS.secondary}
                    />
                </Marker>
            ))}
        </MapView>
    )
}

export default Map;
