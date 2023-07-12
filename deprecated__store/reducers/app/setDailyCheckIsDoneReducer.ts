import { AppState } from "@/types/global";

export const setDailyCheckIsDoneReducer = (
  state: AppState
) => {
  state.dashboard.dailyCheck.isDone.mood = true;
  state.dashboard.dailyCheck.isDone.sleep = true;
  state.dashboard.dailyCheck.isDone.weight = true;
} 
