import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '..'
import { toggleVitals } from '../slices/uiSlice';
import { setVitalsDone } from '../slices/dashboardSlice';
import { PostVitalsRequestBody } from '@/types/global';

const postVitalsThunk = createAsyncThunk('dailyCheck/postVitals', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState
    const dispatch = thunkAPI.dispatch as AppDispatch
    const { bodyweight, sleep, mood } = state.dashboard.dailyEntries;
    const userDayId = state.dashboard.userDay.id
    if (!userDayId) return thunkAPI.rejectWithValue({ error: 'missing date id' })
    const response = await fetch('/api/log/vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bodyweight,
        sleep,
        mood,
        userDayId,
      } satisfies PostVitalsRequestBody),
    })
    const result = await response.json()
    if (response.status !== 200) {
      return thunkAPI.rejectWithValue({ error: result.message })
    }
    dispatch(toggleVitals())
    dispatch(setVitalsDone())
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message || 'Error posting Daily Checkx' })
  }
})

export default postVitalsThunk; 
