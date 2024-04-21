import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TrackerType, TrackerGeolocationType } from '../types/tracker';
import { generateRandomString } from '../utils/common';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const fetchTrackersByUserToken = createAsyncThunk<
    TrackerType[],
    { access_token: string },
    { rejectValue: string }
>(
    'trackers/fetchByUserToken',
    async ({ access_token }: { access_token: string }, { rejectWithValue }) => {
        if (!access_token) return rejectWithValue('Access_token variable is not filled');

        try {
            const trackersResponse = await axios.get<TrackerType[]>(`${apiUrl}/api/trackers/get-by-access-token`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });

            const trackers = trackersResponse.data;

            const enrichedTrackers: TrackerType[] = await Promise.all(trackers.map(async (tracker) => {
                const geoResponse = await axios.get<TrackerGeolocationType>(`${apiUrl}/api/geolocations/get-latest-by-tracker-token`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    },
                    params: {
                        tracker_token: tracker.token
                    }
                });
                tracker.latest_geolocation = geoResponse.data;
                return tracker;
            }));

            return enrichedTrackers;
        } 
        catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                return rejectWithValue(`${error.response?.data}`);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

export const addTracker = createAsyncThunk<
        TrackerType,
        { tracker_name?: string, username: string, tracker_token: string },
        { rejectValue: string }
    >(
    'trackers/addTracker',
    async ({ tracker_name, username, tracker_token }, { rejectWithValue }) => {
        if (!username || !tracker_token) return rejectWithValue('Username or tracker_token variables are not filled');

        try {
            let trackerName = tracker_name;
            if (!trackerName) trackerName = generateRandomString();
            
            const response = await axios.put<TrackerType>(`${apiUrl}/api/trackers/link-to-user`, {
                token: tracker_token,
                user_username: username,
                name: trackerName,
            });

            if (typeof response.data === 'string') {
                return rejectWithValue(response.data);
            }
            return response.data;

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(`${error.response.data}`);
            }

            return rejectWithValue('An unexpected error occurred');
        }
    }
);


interface TrackerState {
    trackers: TrackerType[];
    loading: boolean;
    error: string | null | undefined;
}

const initialState: TrackerState = {
    trackers: [],
    loading: false,
    error: null
};

const trackerSlice = createSlice({
    name: 'trackers',
    initialState,
    reducers: {
        resetTrackers(state) {
            state.trackers = [];
            state.loading = false;
            state.error = null;
        },
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTrackersByUserToken.pending, (state) => {
            if (state.trackers.length > 0) {
                state.loading = false;
            } 
            else {
                state.loading = true;
            }
            state.error = null;
        });
        builder.addCase(fetchTrackersByUserToken.fulfilled, (state, action) => {
            action.payload.forEach(newTracker => {
                const existingTrackerIndex = state.trackers.findIndex(existingTracker => existingTracker.token === newTracker.token);
                if (existingTrackerIndex !== -1) {
                    state.trackers[existingTrackerIndex] = newTracker;
                } else {
                    state.trackers.push(newTracker);
                }
            });
            state.loading = false;       
        });
        builder.addCase(fetchTrackersByUserToken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(addTracker.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addTracker.fulfilled, (state, action) => {
            const existingTracker = state.trackers.find(tracker => tracker.token === action.payload.token);
            if (!existingTracker) {
                state.trackers.push(action.payload);
            }
            state.loading = false;
        });
        builder.addCase(addTracker.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const { resetTrackers, clearError } = trackerSlice.actions;
export default trackerSlice.reducer;