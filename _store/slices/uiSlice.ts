import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState = {
  isNavOpen: false,
  isEntrySelectorOpen: false,
  isDailyEntryOpen: false,
}

const uiSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    toggleNav(state, action: PayloadAction<boolean | undefined>) {
      if (action.payload === undefined) {
        state.isNavOpen = !state.isNavOpen;
      }
      else {
        state.isNavOpen = action.payload;
      }
    },
    toggleEntrySelector(state, action: PayloadAction<boolean | undefined>) {
      if (action.payload === undefined) {
        state.isEntrySelectorOpen = !state.isEntrySelectorOpen;
      }
      else {
        state.isEntrySelectorOpen = action.payload;
      }
    },
    toggleDailyEntry(state, action: PayloadAction<boolean | undefined>) {
      if (action.payload === undefined) {
        state.isDailyEntryOpen = !state.isDailyEntryOpen;
      }
      else {
        state.isDailyEntryOpen = action.payload;
      }
    }
  }
});


export const {
  toggleNav,
  toggleEntrySelector,
  toggleDailyEntry,
} = uiSlice.actions;

export default uiSlice.reducer;
