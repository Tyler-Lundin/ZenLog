import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
  isNavigationOpen: boolean;
  dashboard: {
    isWelcomeDialogOpen: boolean;
    isLogEventMenuOpen: boolean;
  }
}

const initialState: UiState = {
  isNavigationOpen: false,
  dashboard: {
    isWelcomeDialogOpen: true,
    isLogEventMenuOpen: false,
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleNavigation(state) {
      state.isNavigationOpen = !state.isNavigationOpen;
    },
    closeWelcomeDialog(state) {
      state.dashboard.isWelcomeDialogOpen = false;
    },
    toggleLogEventMenu(state) {
      state.dashboard.isLogEventMenuOpen = !state.dashboard.isLogEventMenuOpen;
    },
  }
});

export const { toggleNavigation, closeWelcomeDialog, toggleLogEventMenu, } = uiSlice.actions;

export default uiSlice.reducer;
