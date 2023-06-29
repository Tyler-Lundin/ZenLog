import { AppState } from "@/types/global";

const todaysMonth = new Date().getMonth() + 1;
const todaysDay = new Date().getDate();
const todaysYear = new Date().getFullYear();

export const resetDateReducer = (state: AppState) => {
  state.date.month = todaysMonth;
  state.date.day = todaysDay;
  state.date.year = todaysYear;
}
