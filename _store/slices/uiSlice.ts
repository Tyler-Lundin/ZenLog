import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState = {
  isNavOpen: false,
  isEntrySelectorOpen: false,
  isDailyEntryOpen: false,
  isAddExerciseOpen: false,
}

const uiSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    toggleNav: (state) => { state.isNavOpen = !state.isNavOpen },
    toggleEntrySelector: (state) => { state.isEntrySelectorOpen = !state.isEntrySelectorOpen },
    toggleDailyEntry: (state) => { state.isDailyEntryOpen = !state.isDailyEntryOpen },
    toggleAddExercise: (state) => { state.isAddExerciseOpen = !state.isAddExerciseOpen },
  }
});


export const {
  toggleNav,
  toggleEntrySelector,
  toggleDailyEntry,
  toggleAddExercise,
} = uiSlice.actions;

export default uiSlice.reducer;
