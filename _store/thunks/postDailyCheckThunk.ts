import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '..'

const postDailyEntries = createAsyncThunk('dailyCheck/postDailyEntries', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState
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
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message || 'Error posting Daily Checkx' })
  }
})

export default postDailyEntries; 
