import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '..'
import { resetNewEntry } from '../slices/exerciseSlice'

const postNewExerciseEntryThunk = createAsyncThunk(
  'exercise/postNewExerciseEntry',
  async (_, thunkAPI) => {
    const dispatch = thunkAPI.dispatch
    const state = thunkAPI.getState() as RootState
    const { newEntry } = state.exercise
    const userDayId = state.dashboard.userDay.id
    if (!userDayId) return thunkAPI.rejectWithValue({ error: 'missing date id' })
    const response = await fetch('/api/log/exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...{ newExercise: newEntry },
        userDayId,
      }),
    })

    const result = await response.json()
    if (response.status !== 200) {
      return thunkAPI.rejectWithValue({ error: result.message })
    }
    dispatch(resetNewEntry())
    return result
  }
)

export default postNewExerciseEntryThunk
