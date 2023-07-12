import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState = {
  isNavOpen: false,
  isEntrySelectorOpen: false,
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
    }
  }
});


export const {
  toggleNav,
  toggleEntrySelector
} = uiSlice.actions;

export default uiSlice.reducer;