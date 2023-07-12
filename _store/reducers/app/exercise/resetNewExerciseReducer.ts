import { RootState } from "@/_store";
import { ExerciseInitialState } from "@/_store/slices/exerciseSlice";


export const resetNewExerciseReducer = (
  state: RootState,
) => {
  state.exercise.newEntry = ExerciseInitialState.newEntry
}
