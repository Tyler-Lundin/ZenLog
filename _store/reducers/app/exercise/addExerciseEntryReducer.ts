import { RootState } from '@/_store'
import { ExerciseEntry } from '@prisma/client'
import { PayloadAction } from '@reduxjs/toolkit'

export const addExerciseEntryReducer = (state: RootState, action: PayloadAction<ExerciseEntry>) => {
  state.exercise.allEntries.push(action.payload);
}
