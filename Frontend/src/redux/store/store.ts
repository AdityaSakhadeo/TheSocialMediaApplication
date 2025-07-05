import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from '../slices/loaderSlice'; // Adjust the path as necessary
import alertSlice from '../slices/alertSlice';

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    alert:alertSlice
  },
});

// Export RootState and AppDispatch for type safety
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;