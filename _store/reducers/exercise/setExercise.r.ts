import { RootState } from "@/_store";
import { PayloadAction, Reducer } from "@reduxjs/toolkit";


const setExerciseReducer = (state: RootState, action: PayloadAction<{ id: string, name: string }>) => {
  state.exercise.newEntry.exercise = action.payload
}

export default setExerciseReducer;
