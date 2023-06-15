
import { ExerciseEntry, ExerciseSet } from '@prisma/client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@/types/global';


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
  dashboard: {
    exercise: {
      newExercise: {
        exerciseName: '',
        exerciseId: '',
        sets: [],
      },
      newTags: []
    }
  },
  settings: {
    isCookiesEnabled: false,
    backgroundColors: [
      '#F94144',
      '#F3722C',
      '#F8961E',
      '#F9844A',
    ],
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
    setDateState: (state, action: PayloadAction<{ date: AppState["date"], status: string }>) => {
      const { id } = action.payload.date;
      state.date.id = id;
    },
    addExerciseEntry: (state, action: PayloadAction<ExerciseEntry>) => {
      state.date.exerciseEntries.push(action.payload);
    },
    setExerciseEntries: (state, action: PayloadAction<ExerciseEntry[]>) => {
      state.date.exerciseEntries = action.payload;
    },
    setNewExerciseName: (state, action: PayloadAction<string>) => {
      state.dashboard.exercise.newExercise.exerciseName = action.payload;
    },
    setNewExerciseSets: (state, action: PayloadAction<ExerciseSet[]>) => {
      state.dashboard.exercise.newExercise.sets = action.payload;
    },
    removeNewSet: (state, action: PayloadAction<number>) => {
      state.dashboard.exercise.newExercise.sets.splice(action.payload, 1);
    },
    addSetTag: (state, action: PayloadAction<{ index: number, tag: string }>) => {
      state.dashboard.exercise.newExercise.sets[action.payload.index].tags.push(action.payload.tag);
    },
    setNewTag: (state, action: PayloadAction<{ index: number, tag: string }>) => {
      state.dashboard.exercise.newTags[action.payload.index] = action.payload.tag;
    },
    removeSetTag: (state, action: PayloadAction<{ tagIndex: number, setIndex: number }>) => {
      state.dashboard.exercise.newExercise.sets[action.payload.setIndex].tags.splice(action.payload.tagIndex, 1);
    }
  }
});

export const {
  incrementDate,
  decrementDate,
  resetDate,
  setDateState,
  addExerciseEntry,
  setExerciseEntries,
  setNewExerciseName,
  setNewExerciseSets,
  removeNewSet,
  addSetTag,
  setNewTag,
  removeSetTag
} = appSlice.actions;

export default appSlice.reducer;
