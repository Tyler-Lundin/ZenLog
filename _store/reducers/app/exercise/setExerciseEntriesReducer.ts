import { RootState } from '@/_store'
import { ExerciseEntry } from '@prisma/client'
import { PayloadAction } from '@reduxjs/toolkit'

export const setExerciseEntriesReducer = (
  state: RootState,
  action: PayloadAction<ExerciseEntry[]>
) => {
  state.exercise.allEntries = action.payload
}
