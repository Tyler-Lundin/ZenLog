import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { RootState } from '..'

const logExerciseThunk = createAsyncThunk('logExercise', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState
  try {
    const body = JSON.stringify({
      newExercise: state.exercise.newEntry,
      userDayId: state.dashboard.userDay.id
    })
    const res = await fetch('/api/log/exercise', {
      method: 'POST',
      body,
    }).then((res) => res.json())

    if (res.error) {
      toast(`[ERROR] - ${res.error}`, { type: 'error' })
      return thunkAPI.rejectWithValue(res.error)
    }
    return res
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to log exercise')
  }
})

export default logExerciseThunk
