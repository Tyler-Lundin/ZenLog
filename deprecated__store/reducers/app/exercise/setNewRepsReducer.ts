import { AppState } from "@/types/global";
import { PayloadAction } from "@reduxjs/toolkit";


export const setNewRepsReducer = (state: AppState, action: PayloadAction<number>) => {
  state.dashboard.exercise.newExercise.set.reps = action.payload;
}
