import { ExerciseEntry } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { removeSetTagReducer } from "../reducers/app";

export type SortKeys = "date" | "exercise" | "reps" | "weight" | "intensity" | "toFailure" | "notes" | "tags" | "createdAt" | "updatedAt";
export type SortOrder = "asc" | "desc";

export interface Exercise {
  id: string;
  name: string;
}

export interface EntryFields {
  exercise: Exercise;
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
    exercise: { id: '', name: '' },
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
    setNewExercise(state, action) { state.newEntry.exercise = action.payload },
    setNewReps(state, action) { state.newEntry.reps = action.payload },
    setNewWeight(state, action) { state.newEntry.weight = action.payload },
    setNewToFailure(state, action) { state.newEntry.toFailure = action.payload },
    setNewIntensity(state, action) { state.newEntry.intensity = action.payload },
    setNewNotes(state, action) { state.newEntry.notes = action.payload },
    setNewTags(state, action) { state.newEntry.tags = action.payload },
    pushNewTag(state, action) { state.newEntry.tags.push(action.payload) },
    nextExerciseStep(state) { state.newEntry.currentStep++ },
    prevExerciseStep(state) { state.newEntry.currentStep-- },
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
  setExerciseEntries,
  toggleSortOrder,
  removeTag,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
