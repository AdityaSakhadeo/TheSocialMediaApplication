// src/redux/slices/alertSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material';

interface AlertState {
  type: AlertColor | null;
  message: string;
}

const initialState: AlertState = {
  type: null,
  message: '',
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<{ type: AlertColor; message: string }>) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    clearAlert: (state) => {
      state.type = null;
      state.message = '';
    },
  },
});

export const { showAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
