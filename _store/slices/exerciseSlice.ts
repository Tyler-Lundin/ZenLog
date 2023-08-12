import { ExerciseEntry } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import logExerciseThunk from "../thunks/logExerciseThunk";

export type SortKeys = "date" | "exercise" | "reps" | "weight" | "intensity" | "toFailure" | "notes" | "tags" | "createdAt" | "updatedAt";
export type SortOrder = "asc" | "desc";

export interface NewEntry {
  currentStep: number;
  exerciseId: string | undefined;
  exerciseName: string | undefined;
  reps: number | undefined;
  weight: number | undefined;
  toFailure: boolean | undefined;
  intensity: number | undefined;
  notes: string | undefined;
  tags: string[];
  isSubmitting: boolean;
  isSubmitted: boolean;
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
    exerciseId: undefined,
    exerciseName: undefined,
    reps: undefined,
    weight: undefined,
    toFailure: undefined,
    intensity: undefined,
    notes: undefined,
    tags: [],
    isSubmitting: false,
    isSubmitted: false,
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
      state.newEntry.tags = state.newEntry.tags.filter((_, index) => index !== action.payload);

    },
    toggleIsNewEntrySubmitting(state) { state.newEntry.isSubmitting = !state.newEntry.isSubmitting },
    toggleIsNewEntrySubmitted(state) { state.newEntry.isSubmitted = !state.newEntry.isSubmitted },
  },
  extraReducers: (builder) => {
    builder.addCase(logExerciseThunk.fulfilled, (state) => { state.newEntry.isSubmitting = false; state.newEntry.isSubmitted = true; });
    builder.addCase(logExerciseThunk.rejected, (state) => { state.newEntry.isSubmitting = false });
    builder.addDefaultCase((state) => { return state });
  }
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
  toggleIsNewEntrySubmitting,
  toggleIsNewEntrySubmitted,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
