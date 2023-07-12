import { RootState } from "@/_store";
import { PayloadAction } from "@reduxjs/toolkit";

export const setNewToFailureReducer = (state: RootState, action: PayloadAction<boolean>) => {
  state.exercise.newEntry.toFailure = action.payload;
}
