import { RootState } from "@/_store";
import { PayloadAction } from "@reduxjs/toolkit";


export const setNewNotesReducer = (
  state: RootState,
  action: PayloadAction<string>
) => {
  state.exercise.newEntry.notes = action.payload;
}
