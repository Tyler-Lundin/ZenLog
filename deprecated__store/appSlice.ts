import { ExerciseEntry } from '@prisma/client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState, DailyCheckState } from '@/types/global'
import { EMPTY_SET } from '@/components/exercise/LogExerciseEntry'
import logExerciseThunk from './thunks/logExerciseThunk'
import postDailyCheck from './thunks/postDailyCheckThunk'
import {
  incrementDateReducer,
  decrementDateReducer,
  resetDateReducer,
  setUserDayReducer,
  addExerciseEntryReducer,
  setExerciseEntriesReducer,
  setNewExerciseReducer,
  setNewRepsReducer,
  nextNewExerciseStepReducer,
  setNewWeightReducer,
  setNewToFailureReducer,
  setNewIntensityReducer,
  setNewNotesReducer,
  addSetTagReducer,
  setNewTagReducer,
  removeSetTagReducer,
  setDailyWeightReducer,
  setDailyMoodReducer,
  setDailySleepReducer,
  skipDailyStepReducer,
  resetNewExerciseReducer,
  previousNewExerciseStepReducer,
  setDailyCheckIsDoneReducer,
  nextNewSetStepReducer,
  previousNewSetStepReducer,
  setNewExerciseNameReducer,
} from './reducers/app'

const TODAYS_MONTH = new Date().getMonth() + 1
const TODAYS_DAY = new Date().getDate()
const TODAYS_YEAR = new Date().getFullYear()

const DEFAULT_DAILY_CHECK: DailyCheckState = {
  weight: 180,
  mood: 'HAPPY',
  sleep: 8,
  isDone: {
    weight: false,
    mood: false,
    sleep: false,
  },
  step: 0,
  skipped: {
    weight: false,
    mood: false,
    sleep: false,
  },
}

const initialState: AppState = {
  userDay: {
    id: '',
    month: TODAYS_MONTH,
    day: TODAYS_DAY,
    year: TODAYS_YEAR,
    ExerciseEntries: [],
    FoodEntries: [],
    JournalEntries: [],
    MeditateEntries: [],
    MoodEntries: [],
    SleepEntries: [],
    WeightEntries: [],
    WaterEntries: [],
    ids: {
      ExerciseEntries: [],
      FoodEntries: [],
      JournalEntries: [],
      MeditateEntries: [],
      MoodEntries: [],
      SleepEntries: [],
      WeightEntries: [],
      WaterEntries: [],
    },
  },
  dashboard: {
    exercise: {
      newExercise: {
        id: '',
        step: 0,
        exerciseName: '',
        exerciseId: '',
        set: EMPTY_SET,
        isDone: false,
      },
      newTags: [],
    },
    dailyCheck: DEFAULT_DAILY_CHECK,
  },
  settings: {
    isCookiesEnabled: false,
    backgroundColors: ['#F94144', '#F3722C', '#F8961E', '#F9844A'],
  },
}
export { initialState as AppInitialState }

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Date related reducers
    incrementDate: incrementDateReducer,
    decrementDate: decrementDateReducer,
    resetDate: resetDateReducer,

    // User Day related reducers
    setUserDay: setUserDayReducer,

    // Exercise entries related reducers
    addExerciseEntry: addExerciseEntryReducer,
    setExerciseEntries: setExerciseEntriesReducer,

    // New exercise related reducers
    setNewExerciseName: setNewExerciseNameReducer,
    setNewExercise: setNewExerciseReducer,
    resetNewExercise: resetNewExerciseReducer,
    nextNewExerciseStep: nextNewExerciseStepReducer,
    previousNewExerciseStep: previousNewExerciseStepReducer,

    // Exercise set related reducers
    setNewReps: setNewRepsReducer,
    setNewWeight: setNewWeightReducer,
    setNewToFailure: setNewToFailureReducer,
    setNewIntensity: setNewIntensityReducer,
    setNewNotes: setNewNotesReducer,
    addSetTag: addSetTagReducer,
    setNewTag: setNewTagReducer,
    removeSetTag: removeSetTagReducer,
    nextNewSetStep: nextNewSetStepReducer,
    previousNewSetStep: previousNewSetStepReducer,

    // Daily check related reducers
    setDailyWeight: setDailyWeightReducer,
    setDailyMood: setDailyMoodReducer,
    setDailySleep: setDailySleepReducer,
    skipDailyStep: skipDailyStepReducer,
    setDailyCheckIsDone: setDailyCheckIsDoneReducer,
    nextDailyCheckStep: (state) => {
      state.dashboard.dailyCheck.step++
    },
    previousDailyCheckStep: (state) => {
      state.dashboard.dailyCheck.step--
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logExerciseThunk.fulfilled, (state, action: PayloadAction<ExerciseEntry>) => {
      state.userDay.ExerciseEntries.push(action.payload)
      state.dashboard.exercise.newExercise = initialState.dashboard.exercise.newExercise
    })
    builder.addCase(postDailyCheck.fulfilled, (state, action: PayloadAction<{ isDone: { mood: boolean, sleep: boolean, weight: boolean } }>) => {
      state.dashboard.dailyCheck = initialState.dashboard.dailyCheck
      state.dashboard.dailyCheck.isDone = action.payload.isDone
    }
    )
  },
})

export const {
  incrementDate,
  decrementDate,
  resetDate,
  setUserDay,
  addExerciseEntry,
  setExerciseEntries,
  setNewExerciseName,
  setNewExercise,
  setNewReps,
  setNewWeight,
  setNewToFailure,
  setNewIntensity,
  setNewNotes,
  addSetTag,
  setNewTag,
  removeSetTag,
  setDailyWeight,
  setDailyMood,
  setDailySleep,
  skipDailyStep,
  nextNewExerciseStep,
  resetNewExercise,
  previousNewExerciseStep,
  setDailyCheckIsDone,
  nextNewSetStep,
  previousNewSetStep,
  nextDailyCheckStep,
  previousDailyCheckStep,
} = appSlice.actions

export default appSlice.reducer