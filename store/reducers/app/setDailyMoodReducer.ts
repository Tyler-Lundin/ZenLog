import { AppState } from "@/types/global";
import { Mood } from "@prisma/client";


export const setDailyMoodReducer = (
  state: AppState,
  action: PayloadAction<Mood>
) => {
  state.dashboard.dailyCheck.mood = action.payload;
}
