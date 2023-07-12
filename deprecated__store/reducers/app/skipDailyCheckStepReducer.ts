import { AppState } from "@/types/global";
import { PayloadAction } from "@reduxjs/toolkit";


export const skipDailyStepReducer = (
  state: AppState,
  action: PayloadAction<string>
) => {
  state.dashboard.dailyCheck.isDone[action.payload as keyof typeof state.dashboard.dailyCheck.isDone] = true;
}
