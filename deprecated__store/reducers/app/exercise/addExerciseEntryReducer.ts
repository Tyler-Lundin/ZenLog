import { AppState } from '@/types/global'
import { ExerciseEntry } from '@prisma/client'
import { PayloadAction } from '@reduxjs/toolkit'

export const addExerciseEntryReducer = (state: AppState, action: PayloadAction<ExerciseEntry>) => {
  state.userDay.ExerciseEntries.push(action.payload)
}
