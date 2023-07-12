import { RootState } from "@/_store";
import { PayloadAction } from "@reduxjs/toolkit";


export const setDailySleepReducer = (
  state: RootState,
  action: PayloadAction<number>
) => {
  state.dashboard.dailyEntries.sleep.value = action.payload;
}
