import { Date as IDate, ExerciseEntry, ExerciseSet, Mood } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, DailyCheckState } from '@/types/global';
import { EMPTY_SET } from '@/components/exercise/AddExerciseEntry';
import logExerciseThunk from './thunks/logExerciseThunk';
import postDailyCheck from './thunks/postDailyCheckThunk';

const todaysMonth = new Date().getMonth() + 1;
const todaysDay = new Date().getDate();
const todaysYear = new Date().getFullYear();

const DEFAULT_DAILY_CHECK: DailyCheckState = {
  weight: 180,
  mood: 'HAPPY',
  sleep: 8,
  isDone: {
    weight: true,
    mood: true,
    sleep: true,
  }
}

const initialState: AppState = {
  date: {
    id: '',
    month: todaysMonth,
    day: todaysDay,
    year: todaysYear,
    ExerciseEntries: [],
    FoodEntries: [],
    JournalEntries: [],
    MeditateEntries: [],
    MoodEntries: [],
    SleepEntries: [],
    WeightEntries: [],
    WaterEntries: [],
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
    dailyCheck: DEFAULT_DAILY_CHECK,
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
    setDateState: (state, action: PayloadAction<{ date: IDate, status: string }>) => {
      if (!action.payload.date) return;
      const { id, MoodEntries, WeightEntries, SleepEntries } = action.payload.date;
      state.date.id = id;
      if (MoodEntries.length > 0) state.dashboard.dailyCheck.isDone.mood = true;
      else state.dashboard.dailyCheck.isDone.mood = false;
      if (WeightEntries.length > 0) state.dashboard.dailyCheck.isDone.weight = true;
      else state.dashboard.dailyCheck.isDone.weight = false;
      if (SleepEntries.length > 0) state.dashboard.dailyCheck.isDone.sleep = true;
      else state.dashboard.dailyCheck.isDone.sleep = false;

    },
    addExerciseEntry: (state, action: PayloadAction<ExerciseEntry>) => {
      state.date.ExerciseEntries.push(action.payload);
    },
    setExerciseEntries: (state, action: PayloadAction<ExerciseEntry[]>) => {
      state.date.ExerciseEntries = action.payload;
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
      state.dashboard.dailyCheck.weight = action.payload;
    },
    setDailyMood: (state, action: PayloadAction<Mood>) => {
      state.dashboard.dailyCheck.mood = action.payload;
    },
    setDailySleep: (state, action: PayloadAction<number>) => {
      state.dashboard.dailyCheck.sleep = action.payload;
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
    setDailyCheckIsDone: (state) => {
      state.dashboard.dailyCheck.isDone.mood = true;
      state.dashboard.dailyCheck.isDone.sleep = true;
      state.dashboard.dailyCheck.isDone.weight = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logExerciseThunk.fulfilled, (state, action: PayloadAction<ExerciseEntry>) => {
      state.date.ExerciseEntries.push(action.payload);
      state.dashboard.exercise.newExercise = initialState.dashboard.exercise.newExercise;
    });
    builder.addCase(postDailyCheck.fulfilled, (state, action: PayloadAction<{
      isDone: {
        mood: boolean,
        sleep: boolean,
        weight: boolean
      }
    }>) => {
      state.dashboard.dailyCheck = initialState.dashboard.dailyCheck;
      state.dashboard.dailyCheck.isDone = action.payload.isDone;
    });
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
  setNextStep,
  nextNewExerciseStep,
  previousNewExerciseStep,
  setDailyCheckIsDone
} = appSlice.actions;

export default appSlice.reducer;
