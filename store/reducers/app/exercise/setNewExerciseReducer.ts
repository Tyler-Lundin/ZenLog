
import { AppState } from "@/types/global";
import { Exercise } from "@prisma/client";
import { PayloadAction } from "@reduxjs/toolkit";



export const setNewExerciseReducer = (
  state: AppState,
  action: PayloadAction<Exercise>
) => {
  state.dashboard.exercise.newExercise.exerciseId = action.payload.id;
  state.dashboard.exercise.newExercise.exerciseName = action.payload.name;
}
