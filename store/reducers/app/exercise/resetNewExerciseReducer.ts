import { AppInitialState } from "@/store/appSlice";
import { AppState } from "@/types/global";


export const resetNewExerciseReducer = (
  state: AppState,
) => {
  state.dashboard.exercise.newExercise = AppInitialState.dashboard.exercise.newExercise;
}
