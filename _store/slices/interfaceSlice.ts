import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isNavOpen: false,
}

const interfaceSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    toggleNav(state, action) {
      if (action.payload === undefined) {
        state.isNavOpen = !state.isNavOpen;
      }
      else {
        state.isNavOpen = action.payload;
      }
    }
  }
});


export const { } = interfaceSlice.actions;

export default interfaceSlice.reducer;
