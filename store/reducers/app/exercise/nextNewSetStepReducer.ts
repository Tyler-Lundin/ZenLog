import { AppState } from "@/types/global";


export const nextNewSetStepReducer = (
  state: AppState
) => {
  state.dashboard.exercise.newExercise.set.step++;
}
