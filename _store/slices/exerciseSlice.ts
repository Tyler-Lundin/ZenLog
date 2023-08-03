import { ExerciseEntry } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { removeSetTagReducer } from "../reducers/app";

export type SortKeys = "date" | "exercise" | "reps" | "weight" | "intensity" | "toFailure" | "notes" | "tags" | "createdAt" | "updatedAt";
export type SortOrder = "asc" | "desc";

export interface EntryFields {
  exerciseId: string;
  exerciseName: string;
  reps: number;
  weight: number;
  toFailure: boolean;
  intensity: number;
  notes: string;
  tags: string[];
}

export interface NewEntry extends EntryFields {
  currentStep: number;
}

export interface ExerciseState {
  allEntries: ExerciseEntry[];
  allEntryIds: string[];
  filteredEntries: ExerciseEntry[];
  sortBy: SortKeys;
  sortOrder: SortOrder;
  searchQuery?: string;
  isFiltered: boolean;
  newEntry: NewEntry;
}

const initialState: ExerciseState = {
  allEntries: [],
  allEntryIds: [],
  filteredEntries: [],
  sortBy: "date",
  sortOrder: "desc",
  searchQuery: '',
  isFiltered: false,
  newEntry: {
    currentStep: 0,
    exerciseId: '',
    exerciseName: '',
    reps: 0,
    weight: 0,
    toFailure: false,
    intensity: 5,
    notes: '',
    tags: [],
  }
}

export const ExerciseInitialState: ExerciseState = initialState;

const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    resetNewEntry(state) {
      state.newEntry = initialState.newEntry;
    },
    setNewExercise(state, action) {
      state.newEntry.exerciseId = action.payload.exerciseId
      state.newEntry.exerciseName = action.payload.exerciseName
    },
    setNewReps(state, action) { state.newEntry.reps = action.payload },
    setNewWeight(state, action) { state.newEntry.weight = action.payload },
    setNewToFailure(state, action) { state.newEntry.toFailure = action.payload },
    setNewIntensity(state, action) { state.newEntry.intensity = action.payload },
    setNewNotes(state, action) { state.newEntry.notes = action.payload },
    setNewTags(state, action) { state.newEntry.tags = action.payload },
    pushNewTag(state, action) { state.newEntry.tags.push(action.payload) },
    nextExerciseStep(state) { state.newEntry.currentStep++ },
    prevExerciseStep(state) { state.newEntry.currentStep-- },
    setExerciseStep(state, action) { state.newEntry.currentStep = action.payload },
    resetNewExercise(state) { state.newEntry = initialState.newEntry },
    setExerciseEntries(state, action) { state.allEntries = action.payload },
    toggleSortOrder(state) {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    },
    removeTag(state, action) {
      state.newEntry.tags = state.newEntry.tags.filter(tag => tag !== action.payload)
    }
  },
});

export const {
  resetNewEntry,
  setNewExercise,
  setNewReps,
  setNewWeight,
  setNewToFailure,
  setNewIntensity,
  setNewNotes,
  setNewTags,
  pushNewTag,
  nextExerciseStep,
  prevExerciseStep,
  setExerciseStep,
  resetNewExercise,
  setExerciseEntries,
  toggleSortOrder,
  removeTag,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
