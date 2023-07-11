import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import dashboardReducer from './slices/dashboard/dashboardSlice'

const store = configureStore({
  reducer: {
    // auth: authReducer,
    dashboard: dashboardReducer,
    user: userReducer,
  }
})

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
