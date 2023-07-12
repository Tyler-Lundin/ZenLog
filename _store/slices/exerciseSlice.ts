import { ExerciseEntry } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

export type SortKeys = "date" | "exercise" | "reps" | "weight" | "intensity" | "toFailure" | "notes" | "tags";
export type SortOrder = "asc" | "desc";

export interface Exercise {
  id: string | undefined;
  name: string | undefined;
}

export interface EntryFields {
  exercise: Exercise;
  reps: number | undefined;
  weight: number | undefined;
  toFailure: boolean | undefined;
  intensity: number | undefined;
  notes: string | undefined;
  tags: string[];
}

export interface NewEntry extends EntryFields {
  currentStep: number;
}

export interface ExerciseState {
  allEntries: ExerciseEntry[];
  filteredEntries: ExerciseEntry[];
  sortBy: SortKeys;
  sortOrder: SortOrder;
  searchQuery?: string;
  isFiltered: boolean;
  newEntry: NewEntry;
}

const initialState: ExerciseState = {
  allEntries: [],
  filteredEntries: [],
  sortBy: "date",
  sortOrder: "desc",
  searchQuery: undefined,
  isFiltered: false,
  newEntry: {
    currentStep: 0,
    exercise: { id: undefined, name: undefined },
    reps: undefined,
    weight: undefined,
    toFailure: undefined,
    intensity: undefined,
    notes: undefined,
    tags: [],
  }
}

const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    setNewExercise(state, action) { state.newEntry.exercise = action.payload },
    setNewReps(state, action) { state.newEntry.reps = action.payload },
    setNewWeight(state, action) { state.newEntry.weight = action.payload },
    setNewToFailure(state, action) { state.newEntry.toFailure = action.payload },
    setNewIntensity(state, action) { state.newEntry.intensity = action.payload },
    setNewNotes(state, action) { state.newEntry.notes = action.payload },
    setNewTags(state, action) { state.newEntry.tags = action.payload },
    nextStep(state) { state.newEntry.currentStep++ },
    prevStep(state) { state.newEntry.currentStep-- },
    setExerciseEntries(state, action) { state.allEntries = action.payload }
  },
});

export const {
  setNewExercise,
  setNewReps,
  setNewWeight,
  setNewToFailure,
  setNewIntensity,
  setNewNotes,
  setNewTags,
  nextStep,
  prevStep,
  setExerciseEntries,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
