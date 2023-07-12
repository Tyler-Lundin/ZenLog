import { AppState } from "@/types/global";


export const previousNewSetStepReducer = (
  state: AppState
) => {
  if (state.dashboard.exercise.newExercise.set.step === 0) return;
  state.dashboard.exercise.newExercise.set.step--;
}
