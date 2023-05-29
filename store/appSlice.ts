
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  date: {
    month: number
    day: number
    year: number
  },
}

const todaysMonth = new Date().getMonth() + 1;
const todaysDay = new Date().getDate();
const todaysYear = new Date().getFullYear();

const initialState: AppState = {
  date: {
    month: todaysMonth,
    day: todaysDay,
    year: todaysYear,
  }
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    incrementDate: state => {
      let newDate = new Date(state.date.year, state.date.month - 1, state.date.day + 1);
      state.date.month = newDate.getMonth() + 1;
      state.date.day = newDate.getDate();
      state.date.year = newDate.getFullYear();
    },
    decrementDate: state => {
      let newDate = new Date(state.date.year, state.date.month - 1, state.date.day - 1);
      state.date.month = newDate.getMonth() + 1;
      state.date.day = newDate.getDate();
      state.date.year = newDate.getFullYear();
    },
    resetDate: state => {
      state.date.month = todaysMonth;
      state.date.day = todaysDay;
      state.date.year = todaysYear;
    }
  }
});

export const { incrementDate, decrementDate, resetDate } = appSlice.actions;

export default appSlice.reducer;
