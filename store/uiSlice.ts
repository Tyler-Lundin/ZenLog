import { createSlice } from '@reduxjs/toolkit';

export interface UiState {
  isNavigationOpen: boolean;
  dashboard: {
    isLogEntryMenuOpen: boolean;
    error: string;
    exercise: {
      isLogExerciseFormOpen: boolean;
      isSorted: boolean;
      error: string;
    }
  }
}

const initialState: UiState = {
  isNavigationOpen: false,
  dashboard: {
    isLogEntryMenuOpen: false,
    error: '',
    exercise: {
      isLogExerciseFormOpen: false,
      isSorted: true,
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
    toggleLogEntryMenu(state) {
      state.dashboard.isLogEntryMenuOpen = !state.dashboard.isLogEntryMenuOpen;
    },
    openLogExerciseForm(state) {
      if (state.dashboard.exercise.isLogExerciseFormOpen === true) // this is just in case, but it should never happen 
        state.dashboard.exercise.isLogExerciseFormOpen = false;
      else
        state.dashboard.exercise.isLogExerciseFormOpen = true;
    },
    closeLogExerciseForm(state) {
      if (state.dashboard.exercise.isLogExerciseFormOpen === false) // this is just in case, but it should never happen 
        state.dashboard.exercise.isLogExerciseFormOpen = true;
      else
        state.dashboard.exercise.isLogExerciseFormOpen = false;
    },
    setExerciseError(state, action) {
      state.dashboard.exercise.error = action.payload;
    },
    toggleSortExercise(state) {
      state.dashboard.exercise.isSorted = !state.dashboard.exercise.isSorted;
    },
  }
});

export const {
  toggleNavigation,
  toggleLogEntryMenu,
  openLogExerciseForm,
  closeLogExerciseForm,
  setExerciseError,
  toggleSortExercise
} = uiSlice.actions;

export default uiSlice.reducer;
