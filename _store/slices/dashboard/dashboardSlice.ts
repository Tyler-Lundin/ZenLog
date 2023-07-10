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
    entries: {
      ExerciseEntries: [],
      MoodEntries: [],
      SleepEntries: [],
      BodyWeightEntries: [],
    },
  },
}
