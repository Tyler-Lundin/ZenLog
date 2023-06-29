import { AppState } from "@/types/global";
import { UserActivity } from "@prisma/client";
import { PayloadAction } from "@reduxjs/toolkit";

export const setUserActivityReducer = (state: AppState, action: PayloadAction<{ userActivity: UserActivity, status: string }>) => {
  if (!action.payload.userActivity) return;
  const { id, MoodEntries, WeightEntries, SleepEntries, ExerciseEntries, FoodEntries, WaterEntries, JournalEntries, MeditateEntries } = action.payload.userActivity;
  state.userActivity.id = id;
  if (MoodEntries.length > 0) {
    state.dashboard.dailyCheck.isDone.mood = true;
    state.userActivity.ids.MoodEntries = MoodEntries;
  }
  else state.dashboard.dailyCheck.isDone.mood = false;

  if (WeightEntries.length > 0) {
    state.dashboard.dailyCheck.isDone.weight = true;
    state.userActivity.ids.WeightEntries = WeightEntries;
  }
  else state.dashboard.dailyCheck.isDone.weight = false;

  if (SleepEntries.length > 0) {
    state.dashboard.dailyCheck.isDone.sleep = true;
    state.userActivity.ids.SleepEntries = SleepEntries;
  }
  else state.dashboard.dailyCheck.isDone.sleep = false;

  if (ExerciseEntries.length > 0) state.userActivity.ids.ExerciseEntries = ExerciseEntries;
  if (FoodEntries.length > 0) state.userActivity.ids.FoodEntries = FoodEntries;
  if (WaterEntries.length > 0) state.userActivity.ids.WaterEntries = WaterEntries;
  if (JournalEntries.length > 0) state.userActivity.ids.JournalEntries = JournalEntries;
  if (MeditateEntries.length > 0) state.userActivity.ids.MeditateEntries = MeditateEntries;

}
