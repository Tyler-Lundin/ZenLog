import { AppState } from "@/types/global";
import { PayloadAction } from "@reduxjs/toolkit";


export const setDailySleepReducer = (
  state: AppState,
  action: PayloadAction<number>
) => {
  state.dashboard.dailyCheck.sleep = action.payload;
}
