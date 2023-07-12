import { RootState } from "@/_store";
import { PayloadAction } from "@reduxjs/toolkit";


export const setNewTagReducer = (
  state: RootState,
  action: PayloadAction<{ tagIndex: number, tag: string, setIndex: number }>
) => {
  const { tagIndex, tag } = action.payload;
  state.exercise.newEntry.tags[tagIndex] = tag;
}
