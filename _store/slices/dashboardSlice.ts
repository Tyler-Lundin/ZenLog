import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Mood, UserDay } from '@prisma/client';
import { DateObject, Entry } from '@/types/global';

const TODAYS_MONTH = new Date().getMonth() + 1
const TODAYS_DAY = new Date().getDate()
const TODAYS_YEAR = new Date().getFullYear()


type BodyweightState = Entry<{ weight: number, weightUnit: "lbs" | "kg" }>
type SleepState = Entry<{ hours: number, minutes: number, rating: number }>
type MoodState = Entry<{ mood: Mood }>

export interface Vitals {
  currentStep: number,
  bodyweight: BodyweightState,
  sleep: SleepState,
  mood: MoodState,
}

export interface UserDayState {
  id: string,
  month: number,
  day: number,
  year: number,
}

export interface DashboardState {
  userDay: UserDayState,
  vitals: Vitals,
}

const initialState: DashboardState = {
  userDay: {
    id: '',
    month: TODAYS_MONTH,
    day: TODAYS_DAY,
    year: TODAYS_YEAR,
  },
  vitals: {
    currentStep: 0,
    bodyweight: {
      value: {
        weight: 0,
        weightUnit: "lbs"
      },
    },
    sleep: {
      value: {
        hours: 0,
        minutes: 0,
        rating: 0,
      },
    },
    mood: {
      value: {
        mood: Mood.CALM,
      },
    }
  }
}
export const DashboardInitialState = initialState;


const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setUserDay(state, action: PayloadAction<UserDay>) { state.userDay = action.payload },
    setVitals(state, action: PayloadAction<Vitals>) {
      state.vitals = {
        currentStep: state.vitals.currentStep,
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
    setBodyweight(state, action: PayloadAction<BodyweightState["value"]>) { state.vitals.bodyweight.value = action.payload },
    setSleep(state, action: PayloadAction<SleepState["value"]>) { state.vitals.sleep.value = action.payload },
    setMood(state, action: PayloadAction<MoodState["value"]>) { state.vitals.mood.value = action.payload },
    nextStep(state) { state.vitals.currentStep++ },
    prevStep(state) { state.vitals.currentStep-- },
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
    setDate(state, action: PayloadAction<DateObject>) {
      state.userDay.month = action.payload.month
      state.userDay.day = action.payload.day
      state.userDay.year = action.payload.year
    },
    nextVitalsStep(state) { state.vitals.currentStep++ },
    previousVitalsStep(state) { state.vitals.currentStep-- },
    setVitalsDone(state) {
      state.vitals.mood.status = 'COMPLETE'
      state.vitals.sleep.status = 'COMPLETE'
      state.vitals.bodyweight.status = 'COMPLETE'
    }
  }
})

export const {
  setUserDay,
  setVitals,
  setBodyweight,
  setSleep,
  setMood,
  nextStep,
  prevStep,
  decrementDate,
  incrementDate,
  resetDate,
  setDate,
  nextVitalsStep,
  previousVitalsStep,
  setVitalsDone
} = dashboardSlice.actions


export default dashboardSlice.reducer

