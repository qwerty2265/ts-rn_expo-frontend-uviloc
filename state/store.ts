import { configureStore } from '@reduxjs/toolkit';
import trackerReducer from '../slices/trackerSlice';

export const store = configureStore({
    reducer: {
        trackers: trackerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

