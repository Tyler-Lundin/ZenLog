import { AppState } from "@/types/global";


export const decrementDateReducer = (state: AppState) => {
  let newDate = new Date(state.date.year, state.date.month - 1, state.date.day - 1);
  state.date.month = newDate.getMonth() + 1;
  state.date.day = newDate.getDate();
  state.date.year = newDate.getFullYear();
}
