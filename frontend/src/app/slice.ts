import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../models";

type InitialState = {
  user: User | null;
};

const initialState: InitialState = {
  user: null,
}

const appSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    }
  },
})

export const  {
  setUser,
} = appSlice.actions;

export default appSlice.reducer;
