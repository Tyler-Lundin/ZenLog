import { RootState } from "@/_store";
import { PayloadAction } from "@reduxjs/toolkit";


export const addSetTagReducer = (
  state: RootState,
  action: PayloadAction<string>
) => {
  state.exercise.newEntry.tags.push(action.payload);
}
