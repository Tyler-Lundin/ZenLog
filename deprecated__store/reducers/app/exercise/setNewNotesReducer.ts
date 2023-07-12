import { AppState } from "@/types/global";
import { PayloadAction } from "@reduxjs/toolkit";


export const setNewNotesReducer = (
  state: AppState,
  action: PayloadAction<string>
) => {
  state.dashboard.exercise.newExercise.set.notes = action.payload;
}
