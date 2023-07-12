import { AppState } from "@/types/global";
import { PayloadAction } from "@reduxjs/toolkit";


export const setNewTagReducer = (
  state: AppState,
  action: PayloadAction<{ tagIndex: number, tag: string, setIndex: number }>
) => {
  const { tagIndex, tag } = action.payload;
  state.dashboard.exercise.newExercise.set.tags[tagIndex] = tag;
}
