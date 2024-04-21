import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, TouchableOpacity } from "react-native";
import * as Location from 'expo-location';
import { CustomActivityIndicator } from "../CustomActivityIndicator";
import { useSelector } from "../../state/store";
import styles from "./map.style";
import { COLORS, MAP_THEME, icons } from "../../constants";
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
    const [followsUserLocation, setFollowsUserLocation] = useState<boolean>(false);;
    const mapRef = useRef<MapView>(null);
    const userLocation = useSelector((state) => state.location.userLocation);
    const trackers = useSelector((state) => state.trackers.trackers);

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
                latitudeDelta: 0.004,
                longitudeDelta: 0.005,
            });
        }
    }, [userLocation]);

    useEffect(() => {
        if (followsUserLocation && userLocation && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.0,
            }, 1000);
        }
    }, [followsUserLocation, userLocation]);

    const handleToggleFollowUserLocation = () => {
        setFollowsUserLocation(!followsUserLocation);
    };

    const handleRegionChangeComplete = () => {
        if (mapRegion && followsUserLocation) animateMapToUserLocation();
    };

    const animateMapToUserLocation = () => {
        if (mapRef.current && userLocation) {
            mapRef.current.animateToRegion({
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.02,
            }, 1000);
        }
    };

    if (locationPermissionDenied) {
        return null;
    }

    if (!mapRegion) {
        return <CustomActivityIndicator style={{height: '60%'}} size='large' />;
    }

    return (
        <View style={styles.mapContainer}>
            <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                region={mapRegion}
                customMapStyle={MAP_THEME}
                showsUserLocation={true}
                userLocationUpdateInterval={10000}
                showsMyLocationButton={true}
                loadingEnabled={true}
                onRegionChangeComplete={handleRegionChangeComplete}
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
            <TouchableOpacity 
                style={styles.userFollowButton}
                onPress={handleToggleFollowUserLocation}
            >
                <icons.arrow 
                    style={{transform: [{rotate: followsUserLocation ? '0deg' : '45deg'}]}} 
                    height={20} 
                    width={20} 
                    fill={COLORS.text} 
                    stroke={COLORS.text}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Map
