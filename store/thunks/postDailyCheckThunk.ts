import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'

const postDailyCheck = createAsyncThunk('dailyCheck/postDailyCheck', async (_, thunkAPI) => {
  try {
    console.log('posting daily check')
    const state = thunkAPI.getState() as RootState
    const { weight, sleep, mood } = state.app.dashboard.dailyCheck
    const userDayId = state.app.userDay.id
    if (!userDayId) return thunkAPI.rejectWithValue({ error: 'missing date id' })
    const response = await fetch('/api/log/daily', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        weight,
        sleep,
        mood,
        userDayId,
      }),
    })
    const result = await response.json()
    if (response.status !== 200) {
      return thunkAPI.rejectWithValue({ error: result.message })
    }
    return {
      isDone: {
        weight: weight !== 0,
        sleep: sleep !== 0,
        mood: mood ? true : false,
      },
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message || 'Error posting Daily Checkx' })
  }
})

export default postDailyCheck
