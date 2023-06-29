import { AppState } from "@/types/global";
import { CaseReducer } from "@reduxjs/toolkit";

export const incrementDateReducer: CaseReducer = (state: AppState) => {
  let newDate = new Date(state.userActivity.year, state.userActivity.month - 1, state.userActivity.day + 1);
  state.userActivity.month = newDate.getMonth() + 1;
  state.userActivity.day = newDate.getDate();
  state.userActivity.year = newDate.getFullYear();
}
