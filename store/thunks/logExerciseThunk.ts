import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";


const logExerciseThunk = createAsyncThunk(
  'logExercise',
  async (_, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    try {
      const res = await fetch('/api/log/exercise', {
        method: 'POST',
        body: JSON.stringify({
          newExercise: state.app.dashboard.exercise.newExercise,
          dateId: state.app.date.id,
        }),
      }).then((res) => res.json());

      if (res.error) {
        return thunkAPI.rejectWithValue(res.error);
      }

      return res;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to log exercise');
    }
  }
)

export default logExerciseThunk;
