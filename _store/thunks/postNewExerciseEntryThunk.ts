import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { resetNewExercise } from '../appSlice'
import { closeLogExerciseForm } from '../uiSlice'

const postNewExerciseEntryThunk = createAsyncThunk(
  'exercise/postNewExerciseEntry',
  async (_, thunkAPI) => {
    const dispatch = thunkAPI.dispatch
    const state = thunkAPI.getState() as RootState
    const { newExercise } = state.app.dashboard.exercise
    const userDayId = state.app.userDay.id
    if (!userDayId) return thunkAPI.rejectWithValue({ error: 'missing date id' })
    const response = await fetch('/api/log/exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newExercise,
        userDayId,
      }),
    })

    const result = await response.json()
    if (response.status !== 200) {
      return thunkAPI.rejectWithValue({ error: result.message })
    }
    dispatch(resetNewExercise())
    dispatch(closeLogExerciseForm())
    return result
  }
)

export default postNewExerciseEntryThunk
