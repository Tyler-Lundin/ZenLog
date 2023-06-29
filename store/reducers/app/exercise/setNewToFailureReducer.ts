import { AppState } from "@/types/global";
import { PayloadAction } from "@reduxjs/toolkit";

export const setNewToFailureReducer = (state: AppState, action: PayloadAction<boolean>) => {
  state.dashboard.exercise.newExercise.set.toFailure = action.payload;
}
