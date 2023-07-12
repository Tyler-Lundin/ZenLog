import { RootState } from "@/_store";

export const nextNewExerciseStepReducer = (
  state: RootState,
) => {
  state.exercise.newEntry.currentStep++;
}
