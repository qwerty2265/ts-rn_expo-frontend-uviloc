interface TrackerType {
    id: number;
    user_username: string;
    token: string;
    sim_phone_number: string | null;
    name: string;
    created_at: string;
    updated_at: string;
    latest_geolocation: TrackerGeolocationType;
}

interface TrackerGeolocationType {
    id: number;
    tracker_token: string;
    coordinates: string;
    created_at: string;
    updated_at: string;
}

export { TrackerType, TrackerGeolocationType }