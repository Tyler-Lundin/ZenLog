import { AppState } from "@/types/global";


export const previousNewExerciseStepReducer = (
  state: AppState,
) => {
  if (state.dashboard.exercise.newExercise.step === 0) return;
  state.dashboard.exercise.newExercise.step--;
}
