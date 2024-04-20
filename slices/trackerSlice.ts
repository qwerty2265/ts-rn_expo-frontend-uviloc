import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../state/store';
import { TrackerType } from '../types/tracker';
import { generateRandomString } from '../utils/common';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const fetchTrackersByUserToken = createAsyncThunk<
        TrackerType[],
        { access_token: string },
        { rejectValue: string } 
    >(
    'trackers/fetchByUserToken',
    async ({ access_token }: { access_token: string }, { rejectWithValue }) => {
        if (!access_token) return rejectWithValue('Access_token variable does not filled');

        try {
            const response = await axios.get<TrackerType[]>(`${apiUrl}/api/trackers/get-by-access-token`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(`${error.response?.data}`);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

export const addTracker = createAsyncThunk<
        TrackerType,
        { username: string, tracker_token: string },
        { rejectValue: string }
    >(
    'trackers/addTracker',
    async ({ username, tracker_token }, { rejectWithValue }) => {
        if (!username || !tracker_token) return rejectWithValue('Username or tracker_token variables are not filled');

        try {
            const randomString = generateRandomString();
            const response = await axios.put<TrackerType>(`${apiUrl}/api/trackers/link-to-user`, {
                token: tracker_token,
                user_username: username,
                name: randomString
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
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchTrackersByUserToken.fulfilled, (state, action) => {
            state.trackers = state.trackers.concat(action.payload);
            state.loading = false;
        });
        builder.addCase(fetchTrackersByUserToken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload; // Здесь изменено на action.error.message
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