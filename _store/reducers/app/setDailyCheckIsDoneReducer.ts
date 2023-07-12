import { RootState } from "@/_store";

export const setDailyCheckIsDoneReducer = (
  state: RootState
) => {
  state.dashboard.dailyEntries.mood.status = "COMPLETE";
  state.dashboard.dailyEntries.sleep.status = "COMPLETE";
  state.dashboard.dailyEntries.bodyweight.status = "COMPLETE";
} 
