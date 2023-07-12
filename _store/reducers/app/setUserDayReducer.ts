import { RootState } from '@/_store'
import { UserDay } from '@prisma/client'
import { PayloadAction } from '@reduxjs/toolkit'

export const setUserDayReducer = (
  state: RootState,
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
  state.dashboard.userDay.id = id
  if (MoodEntries.length > 0) {
    state.dashboard.dailyEntries.mood.status = 'COMPLETE';
    // state.mood.allEntries = MoodEntries;
  } else state.dashboard.dailyEntries.mood.status = 'INCOMPLETE'

  if (WeightEntries.length > 0) {
    state.dashboard.dailyEntries.bodyweight.status = "COMPLETE";
    // state.bodyweight.allEntries = WeightEntries;
  } else state.dashboard.dailyEntries.bodyweight.status = "INCOMPLETE"

  if (SleepEntries.length > 0) {
    state.dashboard.dailyEntries.sleep.status = "COMPLETE";
    // state.sleep.allEntries = SleepEntries;
  } else state.dashboard.dailyEntries.sleep.status = "INCOMPLETE"

  if (ExerciseEntries.length > 0) state.exercise.allEntries = ExerciseEntries
  // if (FoodEntries.length > 0) state.food.allEntries = FoodEntries
  // if (WaterEntries.length > 0) state.water.allEntries = WaterEntries
  // if (JournalEntries.length > 0) state.journal.allEntries = JournalEntries
  // if (MeditateEntries.length > 0) state.meditate.allEntries = MeditateEntries
}
