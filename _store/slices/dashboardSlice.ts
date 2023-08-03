import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Mood, UserDay } from '@prisma/client';

const TODAYS_MONTH = new Date().getMonth() + 1
const TODAYS_DAY = new Date().getDate()
const TODAYS_YEAR = new Date().getFullYear()

type Status = 'INCOMPLETE' | 'COMPLETE' | 'SKIPPED'
export type Entry<T> = { value: T, status: Status }

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
      status: 'COMPLETE',
    },
    sleep: {
      value: 0,
      status: 'COMPLETE',
    },
    mood: {
      value: Mood.NEUTRAL,
      status: 'COMPLETE',
    }
  }
}
export const DashboardInitialState = initialState;


const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setUserDay(state, action: PayloadAction<UserDay>) { state.userDay = action.payload },
    setDailyEntries(state, action: PayloadAction<DailyEntries>) {
      state.dailyEntries = {
        currentStep: state.dailyEntries.currentStep,
        bodyweight: {
          status: "COMPLETE",
          value: action.payload.bodyweight.value
        },
        sleep: {
          status: "COMPLETE",
          value: action.payload.sleep.value,
        },
        mood: {
          status: "COMPLETE",
          value: action.payload.mood.value,
        }
      }
    },
    setBodyweight(state, action: PayloadAction<number>) { state.dailyEntries.bodyweight.value = action.payload },
    setSleep(state, action: PayloadAction<number>) { state.dailyEntries.sleep.value = action.payload },
    setMood(state, action: PayloadAction<Mood>) { state.dailyEntries.mood.value = action.payload },
    nextStep(state) { state.dailyEntries.currentStep++ },
    prevStep(state) { state.dailyEntries.currentStep-- },
    // decrementDate: decrementDateReducer,
    decrementDate(state) {
      let newDate = new Date(state.userDay.year, state.userDay.month - 1, state.userDay.day - 1)
      state.userDay.month = newDate.getMonth() + 1
      state.userDay.day = newDate.getDate()
      state.userDay.year = newDate.getFullYear()
    },

    incrementDate(state) {
      let newDate = new Date(state.userDay.year, state.userDay.month - 1, state.userDay.day + 1)
      state.userDay.month = newDate.getMonth() + 1
      state.userDay.day = newDate.getDate()
      state.userDay.year = newDate.getFullYear()
    },
    resetDate(state) {
      state.userDay.month = TODAYS_MONTH
      state.userDay.day = TODAYS_DAY
      state.userDay.year = TODAYS_YEAR
    },
    nextDailyEntryStep(state) { state.dailyEntries.currentStep++ },
    previousDailyEntryStep(state) { state.dailyEntries.currentStep-- },
    setDailyEntriesDone(state) {
      state.dailyEntries.mood.status = 'COMPLETE'
      state.dailyEntries.sleep.status = 'COMPLETE'
      state.dailyEntries.bodyweight.status = 'COMPLETE'
    }
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
  nextDailyEntryStep,
  previousDailyEntryStep,
  setDailyEntriesDone
} = dashboardSlice.actions


export default dashboardSlice.reducer

