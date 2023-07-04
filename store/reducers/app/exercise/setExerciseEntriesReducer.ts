import { AppState } from '@/types/global'
import { ExerciseEntry } from '@prisma/client'
import { PayloadAction } from '@reduxjs/toolkit'

export const setExerciseEntriesReducer = (
  state: AppState,
  action: PayloadAction<ExerciseEntry[]>
) => {
  state.userDay.ExerciseEntries = action.payload
}
