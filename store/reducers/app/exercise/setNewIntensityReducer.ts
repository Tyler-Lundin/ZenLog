import { AppState } from "@/types/global";
import { PayloadAction } from "@reduxjs/toolkit";


export const setNewIntensityReducer = (
  state: AppState,
  action: PayloadAction<number>
) => {
  if (action.payload > 10) action.payload = 10;
  else if (action.payload < 1) action.payload = 1;
  state.dashboard.exercise.newExercise.set.intensity = action.payload;
}
