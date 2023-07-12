import { RootState } from "@/_store";
import { PayloadAction } from "@reduxjs/toolkit";

export const setNewWeightReducer = (state: RootState, action: PayloadAction<number>) => {
  state.exercise.newEntry.weight = action.payload;
}
