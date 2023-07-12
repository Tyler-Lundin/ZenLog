import { RootState } from "@/_store";
import { PayloadAction } from "@reduxjs/toolkit";



export const setNewExerciseNameReducer = (
  state: RootState,
  action: PayloadAction<string>
) => {
  state.exercise.newEntry.exercise.name = action.payload;
}
