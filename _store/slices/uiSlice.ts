import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState = {
  isNavOpen: false,
  isEntrySelectorOpen: false,
  isVitalsOpen: false,
  isAddExerciseOpen: false,
  isLoading: false,
  isSaving: false,
}

const uiSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    toggleNav: (state) => { state.isNavOpen = !state.isNavOpen },
    toggleEntrySelector: (state) => { state.isEntrySelectorOpen = !state.isEntrySelectorOpen },
    toggleVitals: (state) => { state.isVitalsOpen = !state.isVitalsOpen },
    toggleAddExercise: (state) => { state.isAddExerciseOpen = !state.isAddExerciseOpen },
    setLoading: (state, action: PayloadAction<boolean>) => { state.isLoading = action.payload },
    setSaving: (state, action: PayloadAction<boolean>) => { state.isSaving = action.payload },
  }
});


export const {
  toggleNav,
  toggleEntrySelector,
  toggleVitals,
  toggleAddExercise,
  setLoading,
  setSaving,
} = uiSlice.actions;

export default uiSlice.reducer;
