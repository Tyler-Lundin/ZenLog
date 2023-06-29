import { AppState } from "@/types/global";
import { PayloadAction } from "@reduxjs/toolkit";

export const setNewWeightReducer = (state: AppState, action: PayloadAction<number>) => {
  state.dashboard.exercise.newExercise.set.weight = action.payload;
}
