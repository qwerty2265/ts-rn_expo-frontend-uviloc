import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TrackerData {
	selectedTrackerId: number | null;
	selectedTrackerCoordinates: string | null;
}

const initialState: TrackerData = {
	selectedTrackerId: null,
	selectedTrackerCoordinates: null,
};

export const selectedTrackerSlice = createSlice({
	name: 'selectedTracker',
	initialState,
	reducers: {
		setSelectedTracker: (state, action: PayloadAction<TrackerData>) => {
			const { selectedTrackerId, selectedTrackerCoordinates } = action.payload;
			state.selectedTrackerId = selectedTrackerId;
			state.selectedTrackerCoordinates = selectedTrackerCoordinates;
		},
	},
});

export const { setSelectedTracker } = selectedTrackerSlice.actions;

export default selectedTrackerSlice.reducer;
