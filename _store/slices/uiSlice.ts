import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState = {
  isNavOpen: false,
  isEntrySelectorOpen: false,
  isVitalsOpen: false,
  isAddExerciseOpen: false,
}

const uiSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    toggleNav: (state) => { state.isNavOpen = !state.isNavOpen },
    toggleEntrySelector: (state) => { state.isEntrySelectorOpen = !state.isEntrySelectorOpen },
    toggleVitals: (state) => { state.isVitalsOpen = !state.isVitalsOpen },
    toggleAddExercise: (state) => { state.isAddExerciseOpen = !state.isAddExerciseOpen },
  }
});


export const {
  toggleNav,
  toggleEntrySelector,
  toggleVitals,
  toggleAddExercise,
} = uiSlice.actions;

export default uiSlice.reducer;
