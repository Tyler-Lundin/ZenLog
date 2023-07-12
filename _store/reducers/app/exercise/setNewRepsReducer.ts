import { RootState } from "@/_store";
import { PayloadAction } from "@reduxjs/toolkit";


export const setNewRepsReducer = (state: RootState, action: PayloadAction<number>) => {
  state.exercise.newEntry.reps = action.payload;
}
