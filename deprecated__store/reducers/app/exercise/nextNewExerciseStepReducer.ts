import { AppState } from "@/types/global";

export const nextNewExerciseStepReducer = (
  state: AppState,
) => {
  state.dashboard.exercise.newExercise.step++;
}
