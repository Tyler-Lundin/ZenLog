import { AppState } from "@/types/global";
import { PayloadAction } from "@reduxjs/toolkit";


export const removeSetTagReducer = (
  state: AppState,
  action: PayloadAction<number>
) => {
  state.dashboard.exercise.newExercise.set.tags.splice(action.payload, 1);
}
