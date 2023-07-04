import { AppState } from '@/types/global'
import { CaseReducer } from '@reduxjs/toolkit'

export const incrementDateReducer: CaseReducer = (state: AppState) => {
  let newDate = new Date(state.userDay.year, state.userDay.month - 1, state.userDay.day + 1)
  state.userDay.month = newDate.getMonth() + 1
  state.userDay.day = newDate.getDate()
  state.userDay.year = newDate.getFullYear()
}
