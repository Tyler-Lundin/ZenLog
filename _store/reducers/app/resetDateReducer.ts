import { DashboardState } from '@/_store/slices/dashboardSlice'

const todaysMonth = new Date().getMonth() + 1
const todaysDay = new Date().getDate()
const todaysYear = new Date().getFullYear()

export const resetDateReducer = (state: DashboardState) => {
  state.userDay.month = todaysMonth
  state.userDay.day = todaysDay
  state.userDay.year = todaysYear
}
