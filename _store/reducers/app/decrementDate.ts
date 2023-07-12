import { DashboardState } from '@/_store/slices/dashboardSlice'

export const decrementDateReducer = (state: DashboardState) => {
  let newDate = new Date(state.userDay.year, state.userDay.month - 1, state.userDay.day - 1)
  state.userDay.month = newDate.getMonth() + 1
  state.userDay.day = newDate.getDate()
  state.userDay.year = newDate.getFullYear()
}
