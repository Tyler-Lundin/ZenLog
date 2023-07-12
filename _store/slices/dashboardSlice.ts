import { createSlice } from '@reduxjs/toolkit';

const TODAYS_MONTH = new Date().getMonth() + 1
const TODAYS_DAY = new Date().getDate()
const TODAYS_YEAR = new Date().getFullYear()

const initialState = {
  userDay: {
    id: '',
    month: TODAYS_MONTH,
    day: TODAYS_DAY,
    year: TODAYS_YEAR,
  },
  dailyEntries: {
    currentStep: 0,
    bodyweight: 0,
    sleep: 0,
    mood: 'NEUTRAL',
  }
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setUserDay(state, action) { state.userDay = action.payload },
    setBodyweight(state, action) { state.dailyEntries.bodyweight = action.payload },
    setSleep(state, action) { state.dailyEntries.sleep = action.payload },
    setMood(state, action) { state.dailyEntries.mood = action.payload },
    nextStep(state) { state.dailyEntries.currentStep++ },
    prevStep(state) { state.dailyEntries.currentStep-- },
  }
})

export const {
  setUserDay,
  setBodyweight,
  setSleep,
  setMood,
  nextStep,
  prevStep,
} = dashboardSlice.actions


export default dashboardSlice.reducer
