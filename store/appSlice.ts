import { ExerciseEntry, ExerciseSet, Mood } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@/types/global';
import { EMPTY_SET } from '@/components/exercise/AddExerciseEntry';

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
        id: '',
        step: 0,
        exerciseName: '',
        exerciseId: '',
        sets: [EMPTY_SET],
        isDone: false
      },
      newTags: [],
    },
    dailyCheckIn: {
      weight: 180,
      mood: 'HAPPY',
      sleep: 8,
      isDone: false
    },
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
      if (!action.payload.date) return;
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
    setNewReps: (state, action: PayloadAction<{ setIndex: number, reps: number }>) => {
      const { setIndex, reps } = action.payload;
      console.log('setIndex', setIndex);
      console.log('reps', reps);
      state.dashboard.exercise.newExercise.sets[setIndex].reps = reps;
    },
    setNewWeight: (state, action: PayloadAction<{ setIndex: number, weight: number }>) => {
      const { setIndex, weight } = action.payload;
      state.dashboard.exercise.newExercise.sets[setIndex].weight = weight;
    },
    setNewToFailure: (state, action: PayloadAction<{ setIndex: number, toFailure: boolean }>) => {
      const { setIndex, toFailure } = action.payload;
      state.dashboard.exercise.newExercise.sets[setIndex].toFailure = toFailure;
    },
    setNewIntensity: (state, action: PayloadAction<{ setIndex: number, intensity: number }>) => {
      const { setIndex, intensity } = action.payload;
      state.dashboard.exercise.newExercise.sets[setIndex].intensity = intensity;
    },
    setNewNotes: (state, action: PayloadAction<{ setIndex: number, notes: string }>) => {
      const { setIndex, notes } = action.payload;
      state.dashboard.exercise.newExercise.sets[setIndex].notes = notes;
    },
    addSetTag: (state, action: PayloadAction<{ setIndex: number, tag: string }>) => {
      state.dashboard.exercise.newExercise.sets[action.payload.setIndex].tags.push(action.payload.tag);
    },
    setNewTag: (state, action: PayloadAction<{ tagIndex: number, tag: string, setIndex: number }>) => {
      const { tagIndex, tag, setIndex } = action.payload;
      state.dashboard.exercise.newExercise.sets[setIndex].tags[tagIndex] = tag;
    },
    removeSetTag: (state, action: PayloadAction<{ tagIndex: number, setIndex: number }>) => {
      state.dashboard.exercise.newExercise.sets[action.payload.setIndex].tags.splice(action.payload.tagIndex, 1);
    },
    addSet: (state) => {
      if (state.dashboard.exercise.newExercise.sets.length < 6) {
        state.dashboard.exercise.newExercise.sets.push(EMPTY_SET);
      }
    },
    setDailyWeight: (state, action: PayloadAction<number>) => {
      state.dashboard.dailyCheckIn.weight = action.payload;
    },
    setDailyMood: (state, action: PayloadAction<Mood>) => {
      state.dashboard.dailyCheckIn.mood = action.payload;
    },
    setDailySleep: (state, action: PayloadAction<number>) => {
      state.dashboard.dailyCheckIn.sleep = action.payload;
    },
    setDailyCheckIsDone: (state, action: PayloadAction<boolean>) => {
      state.dashboard.dailyCheckIn.isDone = action.payload;
    },
    setNextStep: (state, action: PayloadAction<number>) => {
      state.dashboard.exercise.newExercise.step = action.payload;
    },
    nextNewExerciseStep: (state) => {
      state.dashboard.exercise.newExercise.step++;
    },
    previousNewExerciseStep: (state) => {
      if (state.dashboard.exercise.newExercise.step === 0) return;
      state.dashboard.exercise.newExercise.step--;
    },

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
  setNewReps,
  setNewWeight,
  setNewToFailure,
  setNewIntensity,
  setNewNotes,
  addSetTag,
  setNewTag,
  removeSetTag,
  addSet,
  setDailyWeight,
  setDailyMood,
  setDailySleep,
  setDailyCheckIsDone,
  setNextStep,
  nextNewExerciseStep,
  previousNewExerciseStep,
} = appSlice.actions;

export default appSlice.reducer;
