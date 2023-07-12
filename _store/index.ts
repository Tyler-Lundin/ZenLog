import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import dashboardReducer from './slices/dashboardSlice';
import exerciseReducer from './slices/exerciseSlice';
import interfaceReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    // auth: authReducer,
    dashboard: dashboardReducer,
    user: userReducer,
    exercise: exerciseReducer,
    ui: interfaceReducer,
  }
})

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
