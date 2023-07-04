import { AppState } from '@/types/global'

export const decrementDateReducer = (state: AppState) => {
  let newDate = new Date(state.userDay.year, state.userDay.month - 1, state.userDay.day - 1)
  state.userDay.month = newDate.getMonth() + 1
  state.userDay.day = newDate.getDate()
  state.userDay.year = newDate.getFullYear()
}
