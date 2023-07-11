import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@prisma/client";
import { RootState } from "..";


const initialState: User & { [key: string]: any } = {
  id: '',
  name: null,
  email: null,
  emailVerified: null,
  image: null,
  role: 'user',
  createdExercises: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  }
})

export const {
} = userSlice.actions

export default userSlice.reducer
