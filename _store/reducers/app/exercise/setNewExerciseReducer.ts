
import { RootState } from "@/_store";
import { Exercise } from "@prisma/client";
import { PayloadAction } from "@reduxjs/toolkit";



export const setNewExerciseReducer = (
  state: RootState,
  action: PayloadAction<Exercise>
) => {
  state.exercise.newEntry.exercise.id = action.payload.id;
  state.exercise.newEntry.exercise.name = action.payload.name;
}
