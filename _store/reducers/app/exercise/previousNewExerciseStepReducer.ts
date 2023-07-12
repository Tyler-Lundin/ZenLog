import { RootState } from "@/_store";


export const previousNewExerciseStepReducer = (
  state: RootState,
) => {
  if (state.exercise.newEntry.currentStep === 0) return;
  state.exercise.newEntry.currentStep--;
}
