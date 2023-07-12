import { RootState } from "@/_store";


export const previousNewSetStepReducer = (
  state: RootState
) => {
  if (state.exercise.newEntry.currentStep === 0) return;
  state.exercise.newEntry.currentStep--;
}
