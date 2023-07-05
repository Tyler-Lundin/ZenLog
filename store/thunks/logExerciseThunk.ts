import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { resetNewExercise } from '../appSlice'
import { closeLogExerciseForm } from '../uiSlice'
import { toast } from 'react-toastify'

const logExerciseThunk = createAsyncThunk('logExercise', async (_, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState
  const dispatch = thunkAPI.dispatch
  try {
    const body = JSON.stringify({
      newExercise: state.app.dashboard.exercise.newExercise,
      userDayId: state.app.userDay.id,
    })
    console.log(body)
    const res = await fetch('/api/log/exercise', {
      method: 'POST',
      body,
    }).then((res) => res.json())

    if (res.error) {
      toast(`[ERROR] - ${res.error}`, { type: 'error' })
      return thunkAPI.rejectWithValue(res.error)
    }
    dispatch(resetNewExercise())
    dispatch(closeLogExerciseForm())

    return res
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to log exercise')
  }
})

export default logExerciseThunk
