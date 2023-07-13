import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '..'
import { toggleDailyEntry } from '../slices/uiSlice';
import { setDailyEntriesDone } from '../slices/dashboardSlice';

const postDailyEntriesThunk = createAsyncThunk('dailyCheck/postDailyEntries', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState
    const dispatch = thunkAPI.dispatch as AppDispatch
    const { bodyweight, sleep, mood } = state.dashboard.dailyEntries;
    const userDayId = state.dashboard.userDay.id
    if (!userDayId) return thunkAPI.rejectWithValue({ error: 'missing date id' })
    const response = await fetch('/api/log/daily', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bodyweight,
        sleep,
        mood,
        userDayId,
      }),
    })
    const result = await response.json()
    if (response.status !== 200) {
      return thunkAPI.rejectWithValue({ error: result.message })
    }
    dispatch(toggleDailyEntry(false))
    dispatch(setDailyEntriesDone())
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message || 'Error posting Daily Checkx' })
  }
})

export default postDailyEntriesThunk; 
