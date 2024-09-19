import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from '../slices/loaderSlice'; // Adjust the path as necessary

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
  },
});

// Export RootState and AppDispatch for type safety
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;