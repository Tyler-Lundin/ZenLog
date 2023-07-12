import { AppState } from "@/types/global";
import { PayloadAction } from "@reduxjs/toolkit";


export const addSetTagReducer = (
  state: AppState,
  action: PayloadAction<string>
) => {
  state.dashboard.exercise.newExercise.set.tags.push(action.payload);
}
