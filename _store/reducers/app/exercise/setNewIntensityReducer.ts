import { RootState } from "@/_store";
import { PayloadAction } from "@reduxjs/toolkit";


export const setNewIntensityReducer = (
  state: RootState,
  action: PayloadAction<number>
) => {
  if (action.payload > 10) action.payload = 10;
  else if (action.payload < 1) action.payload = 1;
  state.exercise.newEntry.intensity = action.payload;
}
