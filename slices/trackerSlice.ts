import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../state/store';
import { TrackerType } from '../types/tracker';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const fetchTrackersByUserToken= createAsyncThunk(
    'trackers/fetchByUserName',
    async ({ access_token }: { access_token: string }) => {
        try {
            const response = await axios.get<TrackerType[]>(`${apiUrl}/api/trackers/${access_token}`);
            return response.data;
        } 
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
                throw new Error(`Server responded with error: ${error.response?.status}, ${error.response?.data}`);
            } 
            else {
                console.error('Unexpected error:', error);
                throw new Error('An unexpected error occurred');
            }
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
        builder.addCase(fetchTrackersByUserToken.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchTrackersByUserToken.fulfilled, (state, action) => {
            state.trackers = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchTrackersByUserToken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

export default trackerSlice.reducer;