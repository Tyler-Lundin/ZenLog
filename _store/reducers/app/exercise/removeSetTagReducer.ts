import { RootState } from "@/_store";
import { PayloadAction } from "@reduxjs/toolkit";


export const removeSetTagReducer = (
  state: RootState,
  action: PayloadAction<number>
) => {
  state.exercise.newEntry.tags.splice(action.payload, 1);
}
