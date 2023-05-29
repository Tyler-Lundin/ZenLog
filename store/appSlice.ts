
import { ExerciseEntry } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  date: {
    id?: String
    month: number
    day: number
    year: number
    exerciseEntryIds: String[]
    foodEntryIds: String[]
    waterEntryIds: String[]
    sleepEntryIds: String[]
    journalEntryIds: String[]
    moodEntryIds: String[]
    meditateEntryIds: String[]
  },
  Entries: {
    Exercise: ExerciseEntry[],
  }
}

const todaysMonth = new Date().getMonth() + 1;
const todaysDay = new Date().getDate();
const todaysYear = new Date().getFullYear();

const initialState: AppState = {
  date: {
    month: todaysMonth,
    day: todaysDay,
    year: todaysYear,
    exerciseEntryIds: [],
    foodEntryIds: [],
    waterEntryIds: [],
    sleepEntryIds: [],
    journalEntryIds: [],
    moodEntryIds: [],
    meditateEntryIds: []
  },
  Entries: {
    Exercise: []
  }
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
    setDateState: (state, action: PayloadAction<AppState["date"]>) => {
      const { id, exerciseEntryIds, foodEntryIds, waterEntryIds, sleepEntryIds, journalEntryIds, moodEntryIds, meditateEntryIds } = action.payload;
      state.date.id = id;
      state.date.exerciseEntryIds = exerciseEntryIds || [];
      state.date.foodEntryIds = foodEntryIds || [];
      state.date.waterEntryIds = waterEntryIds || [];
      state.date.sleepEntryIds = sleepEntryIds || [];
      state.date.journalEntryIds = journalEntryIds || [];
      state.date.moodEntryIds = moodEntryIds || [];
      state.date.meditateEntryIds = meditateEntryIds || [];
    },
    addExerciseEntry: (state, action: PayloadAction<ExerciseEntry>) => {
      state.Entries.Exercise.push(action.payload);
      state.date.exerciseEntryIds.push(action.payload.id);
    }
  }
});

export const { incrementDate, decrementDate, resetDate, setDateState, addExerciseEntry } = appSlice.actions;

export default appSlice.reducer;
