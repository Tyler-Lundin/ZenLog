import { AppState } from '@/types/global'
import { UserDay } from '@prisma/client'
import { PayloadAction } from '@reduxjs/toolkit'

export const setUserDayReducer = (
  state: AppState,
  action: PayloadAction<UserDay>
) => {
  if (!action.payload) return
  const {
    id,
    MoodEntries,
    WeightEntries,
    SleepEntries,
    ExerciseEntries,
    FoodEntries,
    WaterEntries,
    JournalEntries,
    MeditateEntries,
  } = action.payload
  state.userDay.id = id
  if (MoodEntries.length > 0) {
    state.dashboard.dailyCheck.isDone.mood = true
    state.userDay.ids.MoodEntries = MoodEntries
  } else state.dashboard.dailyCheck.isDone.mood = false

  if (WeightEntries.length > 0) {
    state.dashboard.dailyCheck.isDone.weight = true
    state.userDay.ids.WeightEntries = WeightEntries
  } else state.dashboard.dailyCheck.isDone.weight = false

  if (SleepEntries.length > 0) {
    state.dashboard.dailyCheck.isDone.sleep = true
    state.userDay.ids.SleepEntries = SleepEntries
  } else state.dashboard.dailyCheck.isDone.sleep = false

  if (ExerciseEntries.length > 0) state.userDay.ids.ExerciseEntries = ExerciseEntries
  if (FoodEntries.length > 0) state.userDay.ids.FoodEntries = FoodEntries
  if (WaterEntries.length > 0) state.userDay.ids.WaterEntries = WaterEntries
  if (JournalEntries.length > 0) state.userDay.ids.JournalEntries = JournalEntries
  if (MeditateEntries.length > 0) state.userDay.ids.MeditateEntries = MeditateEntries
}
