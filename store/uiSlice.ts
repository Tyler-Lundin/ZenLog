import { createSlice } from '@reduxjs/toolkit';

export interface UiState {
  isNavigationOpen: boolean;
  dashboard: {
    isWelcomeDialogOpen: boolean;
    isLogEventMenuOpen: boolean;
    exercise: {
      isLogExerciseFormOpen: boolean;
      error: string;
    }
  }
}

const initialState: UiState = {
  isNavigationOpen: false,
  dashboard: {
    isWelcomeDialogOpen: true,
    isLogEventMenuOpen: false,
    exercise: {
      isLogExerciseFormOpen: false,
      error: ''
    }
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
    toggleLogExerciseForm(state) {
      state.dashboard.exercise.isLogExerciseFormOpen = !state.dashboard.exercise.isLogExerciseFormOpen;
    },
    setExerciseError(state, action) {
      state.dashboard.exercise.error = action.payload;
    }
  }
});

export const {
  toggleNavigation,
  closeWelcomeDialog,
  toggleLogEventMenu,
  toggleLogExerciseForm,
  setExerciseError,
} = uiSlice.actions;

export default uiSlice.reducer;
