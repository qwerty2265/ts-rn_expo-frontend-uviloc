import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../state/store';
import { TrackerType } from '../types/tracker';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const fetchTrackersByUsername = createAsyncThunk(
    'trackers/fetchByUserName',
    async ({ username }: { username: string }, { rejectWithValue }) => {
        try {
            const response = await axios.get<TrackerType[]>(`${apiUrl}/api/trackers/${username}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            }
            throw error;
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTrackersByUsername.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchTrackersByUsername.fulfilled, (state, action) => {
            state.trackers = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchTrackersByUsername.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

export default trackerSlice.reducer;