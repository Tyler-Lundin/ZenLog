import { RootState } from "@/_store";
import { Mood } from "@prisma/client";
import { PayloadAction } from "@reduxjs/toolkit";


export const setDailyMoodReducer = (
  state: RootState,
  action: PayloadAction<Mood>
) => {
  state.dashboard.dailyEntries.mood.value = action.payload;
}
