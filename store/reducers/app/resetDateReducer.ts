import { AppState } from "@/types/global";

const todaysMonth = new Date().getMonth() + 1;
const todaysDay = new Date().getDate();
const todaysYear = new Date().getFullYear();

export const resetDateReducer = (state: AppState) => {
  state.userActivity.month = todaysMonth;
  state.userActivity.day = todaysDay;
  state.userActivity.year = todaysYear;
}
