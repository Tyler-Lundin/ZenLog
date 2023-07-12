import { AppState } from "@/types/global";
import { Mood } from "@prisma/client";
import { PayloadAction } from "@reduxjs/toolkit";


export const setDailyMoodReducer = (
  state: AppState,
  action: PayloadAction<Mood>
) => {
  state.dashboard.dailyCheck.mood = action.payload;
}
