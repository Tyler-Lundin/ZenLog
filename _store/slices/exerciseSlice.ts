import { ExerciseEntry } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

export interface ExerciseState {
  newEntry: {
    currentStep: number;
    exercise: { id: string | null, name: string | null };
    reps: number | null;
    weight: number | null;
    toFailure: boolean | null;
    intensity: number | null;
    notes: string | null;
    tags: string[];
  };
}

const initialState: ExerciseState = {
  newEntry: {
    currentStep: 0,
    exercise: { id: null, name: null },
    reps: null,
    weight: null,
    toFailure: null,
    intensity: null,
    notes: null,
    tags: [],
  }
}

const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    sewNewExercise: (state, action) => { },

  },
});

const {
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
