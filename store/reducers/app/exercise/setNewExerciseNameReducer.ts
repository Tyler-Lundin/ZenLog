import { AppState } from "@/types/global";
import { PayloadAction } from "@reduxjs/toolkit";



export const setNewExerciseNameReducer = (
  state: AppState,
  action: PayloadAction<string>
) => {
  state.dashboard.exercise.newExercise.exerciseName = action.payload;
}
