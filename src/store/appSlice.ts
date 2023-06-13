
import { ExerciseEntry } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  date: {
    id?: String
    month: number
    day: number
    year: number
    exerciseEntries: ExerciseEntry[]
    foodEntries: String[]
    waterEntries: String[]
    sleepEntries: String[]
    journalEntries: String[]
    moodEntries: String[]
    meditateEntries: String[]
  },
}

const todaysMonth = new Date().getMonth() + 1;
const todaysDay = new Date().getDate();
const todaysYear = new Date().getFullYear();

const initialState: AppState = {
  date: {
    month: todaysMonth,
    day: todaysDay,
    year: todaysYear,
    exerciseEntries: [],
    foodEntries: [],
    waterEntries: [],
    sleepEntries: [],
    journalEntries: [],
    moodEntries: [],
    meditateEntries: []
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    incrementDate: state => {
      let newDate = new Date(state.date.year, state.date.month - 1, state.date.day + 1);
      state.date.month = newDate.getMonth() + 1;
      state.date.day = newDate.getDate();
      state.date.year = newDate.getFullYear();
    },
    decrementDate: state => {
      let newDate = new Date(state.date.year, state.date.month - 1, state.date.day - 1);
      state.date.month = newDate.getMonth() + 1;
      state.date.day = newDate.getDate();
      state.date.year = newDate.getFullYear();
    },
    resetDate: state => {
      state.date.month = todaysMonth;
      state.date.day = todaysDay;
      state.date.year = todaysYear;
    },
    setDateState: (state, action: PayloadAction<{ date: AppState["date"], status: string }>) => {
      const { id } = action.payload.date;
      console.log('SET_DATE_STATE', action.payload);
      state.date.id = id;
    },
    addExerciseEntry: (state, action: PayloadAction<ExerciseEntry>) => {
      state.date.exerciseEntries.push(action.payload);
    },
    setExerciseEntries: (state, action: PayloadAction<ExerciseEntry[]>) => {
      state.date.exerciseEntries = action.payload;
    }
  }
});

export const {
  incrementDate,
  decrementDate,
  resetDate,
  setDateState,
  addExerciseEntry,
  setExerciseEntries
} = appSlice.actions;

export default appSlice.reducer;
