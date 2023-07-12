import { RootState } from "@/_store";
import { PayloadAction } from "@reduxjs/toolkit";



export const setDailyBodyweightReducer = (
  state: RootState,
  action: PayloadAction<number>
) => {
  state.dashboard.dailyEntries.bodyweight.value = action.payload;
}
