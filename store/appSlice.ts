import { Date as IDate, ExerciseEntry, ExerciseSet, Mood, Exercise } from '@prisma/client';
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
    ids: {
      ExerciseEntries: [],
      FoodEntries: [],
      JournalEntries: [],
      MeditateEntries: [],
      MoodEntries: [],
      SleepEntries: [],
      WeightEntries: [],
      WaterEntries: [],
    }
  },
  dashboard: {
    exercise: {
      newExercise: {
        id: '',
        step: 0,
        exerciseName: '',
        exerciseId: '',
        set: EMPTY_SET,
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
      const { id, MoodEntries, WeightEntries, SleepEntries, ExerciseEntries, FoodEntries, WaterEntries, JournalEntries, MeditateEntries } = action.payload.date;
      state.date.id = id;
      if (MoodEntries.length > 0) {
        state.dashboard.dailyCheck.isDone.mood = true;
        state.date.ids.MoodEntries = MoodEntries;
      }
      else state.dashboard.dailyCheck.isDone.mood = false;

      if (WeightEntries.length > 0) {
        state.dashboard.dailyCheck.isDone.weight = true;
        state.date.ids.WeightEntries = WeightEntries;
      }
      else state.dashboard.dailyCheck.isDone.weight = false;

      if (SleepEntries.length > 0) {
        state.dashboard.dailyCheck.isDone.sleep = true;
        state.date.ids.SleepEntries = SleepEntries;
      }
      else state.dashboard.dailyCheck.isDone.sleep = false;

      if (ExerciseEntries.length > 0) state.date.ids.ExerciseEntries = ExerciseEntries;
      if (FoodEntries.length > 0) state.date.ids.FoodEntries = FoodEntries;
      if (WaterEntries.length > 0) state.date.ids.WaterEntries = WaterEntries;
      if (JournalEntries.length > 0) state.date.ids.JournalEntries = JournalEntries;
      if (MeditateEntries.length > 0) state.date.ids.MeditateEntries = MeditateEntries;

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
    setNewExercise: (state, action: PayloadAction<Exercise>) => {
      state.dashboard.exercise.newExercise.exerciseId = action.payload.id;
      state.dashboard.exercise.newExercise.exerciseName = action.payload.name;
    },
    setNewReps: (state, action: PayloadAction<number>) => {
      state.dashboard.exercise.newExercise.set.reps = action.payload;
    },
    setNewWeight: (state, action: PayloadAction<number>) => {
      state.dashboard.exercise.newExercise.set.weight = action.payload;
    },
    setNewToFailure: (state, action: PayloadAction<boolean>) => {
      state.dashboard.exercise.newExercise.set.toFailure = action.payload;
    },
    setNewIntensity: (state, action: PayloadAction<number>) => {
      if (action.payload > 10) action.payload = 10;
      else if (action.payload < 1) action.payload = 1;
      state.dashboard.exercise.newExercise.set.intensity = action.payload;
    },
    setNewNotes: (state, action: PayloadAction<string>) => {
      state.dashboard.exercise.newExercise.set.notes = action.payload;
    },
    addSetTag: (state, action: PayloadAction<string>) => {
      state.dashboard.exercise.newExercise.set.tags.push(action.payload);
    },
    setNewTag: (state, action: PayloadAction<{ tagIndex: number, tag: string, setIndex: number }>) => {
      const { tagIndex, tag } = action.payload;
      state.dashboard.exercise.newExercise.set.tags[tagIndex] = tag;
    },
    removeSetTag: (state, action: PayloadAction<number>) => {
      state.dashboard.exercise.newExercise.set.tags.splice(action.payload, 1);
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
    skipDailyStep: (state, action: PayloadAction<string>) => {
      state.dashboard.dailyCheck.isDone[action.payload as keyof typeof state.dashboard.dailyCheck.isDone] = true;
    },
    resetNewExercise: (state) => {
      state.dashboard.exercise.newExercise = initialState.dashboard.exercise.newExercise;
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
    nextNewSetStep: (state) => {
      if (state.dashboard.exercise.newExercise.set.step === 2) return;
      state.dashboard.exercise.newExercise.set.step++;
    },
    previousNewSetStep: (state) => {
      if (state.dashboard.exercise.newExercise.set.step === 0) return;
      state.dashboard.exercise.newExercise.set.step--;
    }
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
  setNextStep,
  skipDailyStep,
  nextNewExerciseStep,
  resetNewExercise,
  previousNewExerciseStep,
  setDailyCheckIsDone,
  nextNewSetStep,
  previousNewSetStep,
} = appSlice.actions;

export default appSlice.reducer;
