import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  darkMode: boolean;
  sidebarOpen: boolean;
  loading: boolean;
  notifications: {
    open: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  };
}

const initialState: UIState = {
  darkMode: false,
  sidebarOpen: true,
  loading: false,
  notifications: {
    open: false,
    message: '',
    type: 'info',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    showNotification: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' | 'warning' }>) => {
      state.notifications = {
        open: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    hideNotification: (state) => {
      state.notifications.open = false;
    },
  },
});

export const {
  toggleDarkMode,
  toggleSidebar,
  setLoading,
  showNotification,
  hideNotification,
} = uiSlice.actions;

export default uiSlice.reducer; 