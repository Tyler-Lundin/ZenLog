import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import appReducer from "./appSlice";



const store = configureStore({
  reducer: {
    ui: uiReducer,
    app: appReducer,
  }
})



export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;