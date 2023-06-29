import { AppState } from "@/types/global";
import { PayloadAction } from "@reduxjs/toolkit";



export const setDailyWeightReducer = (
  state: AppState,
  action: PayloadAction<number>
) => {
  state.dashboard.dailyCheck.weight = action.payload;
}
