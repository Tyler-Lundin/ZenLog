import { RootState } from "@/_store";


export const nextNewSetStepReducer = (
  state: RootState
) => {
  state.exercise.newEntry.currentStep++;
}
