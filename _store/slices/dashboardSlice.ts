import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { decrementDateReducer, incrementDateReducer, resetDateReducer } from '../reducers/app';
import { Mood, UserDay } from '@prisma/client';

const TODAYS_MONTH = new Date().getMonth() + 1
const TODAYS_DAY = new Date().getDate()
const TODAYS_YEAR = new Date().getFullYear()

type Status = 'INCOMPLETE' | 'COMPLETE' | 'SKIPPED'
type Entry<T> = { value: T, status: Status }

export interface DailyEntries {
  currentStep: number,
  bodyweight: Entry<number>,
  sleep: Entry<number>,
  mood: Entry<Mood>,
}

export interface UserDayState {
  id: string,
  month: number,
  day: number,
  year: number,
}

export interface DashboardState {
  userDay: UserDayState,
  dailyEntries: DailyEntries,
}

const initialState: DashboardState = {
  userDay: {
    id: '',
    month: TODAYS_MONTH,
    day: TODAYS_DAY,
    year: TODAYS_YEAR,
  },
  dailyEntries: {
    currentStep: 0,
    bodyweight: {
      value: 0,
      status: 'INCOMPLETE',
    },
    sleep: {
      value: 0,
      status: 'INCOMPLETE',
    },
    mood: {
      value: Mood.NEUTRAL,
      status: 'INCOMPLETE',
    }
  }
}
export const DashboardInitialState = initialState;


const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setUserDay(state, action: PayloadAction<UserDay>) { state.userDay = action.payload },
    setDailyEntries(state, action: PayloadAction<DailyEntries>) { state.dailyEntries = { ...action.payload, currentStep: state.dailyEntries.currentStep } },
    setBodyweight(state, action: PayloadAction<number>) { state.dailyEntries.bodyweight.value = action.payload },
    setSleep(state, action: PayloadAction<number>) { state.dailyEntries.sleep.value = action.payload },
    setMood(state, action: PayloadAction<Mood>) { state.dailyEntries.mood.value = action.payload },
    nextStep(state) { state.dailyEntries.currentStep++ },
    prevStep(state) { state.dailyEntries.currentStep-- },
    decrementDate: decrementDateReducer,
    incrementDate: incrementDateReducer,
    resetDate: resetDateReducer,
  }
})

export const {
  setUserDay,
  setDailyEntries,
  setBodyweight,
  setSleep,
  setMood,
  nextStep,
  prevStep,
  decrementDate,
  incrementDate,
  resetDate,
} = dashboardSlice.actions


export default dashboardSlice.reducer
