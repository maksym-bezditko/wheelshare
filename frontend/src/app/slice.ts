import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Car, RentedCar, User } from "../models";
import { RootState } from "./store";

type InitialState = {
  isSidebarVisible: boolean;
  user: User | null;
  cars: Car[] | null,
  unavailableCars: string[],
  isSignedIn: boolean,
  timestamp: number;
};

const initialState: InitialState = {
  isSidebarVisible: false,
  user: null,
  cars: null,
  unavailableCars: [],
  isSignedIn: false,
  timestamp: 0,
}

const appSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isSignedIn = Boolean(action.payload);
    },

    setIsSidebarVisible: (state, action: PayloadAction<boolean>) => {
      state.isSidebarVisible = action.payload;
    },

    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
    },

    setIsSignedIn: (state, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload;
    },

    setBookmarks: (state, action: PayloadAction<string[]>) => {
      if (state.user) {
        state.user.bookmarkedCars = action.payload;
      }
    },

    setRentedCars: (state, action: PayloadAction<RentedCar[]>) => {
      if (state.user) {
        state.user.rentedCars = action.payload;
      }
    },

    setUnavailableCars: (state, action: PayloadAction<string[]>) => {
      if (state.user) {
        state.unavailableCars = action.payload;
      }
    },

    setTimestamp: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.timestamp = action.payload;
      }
    },

    logout: (state) => {
      state.isSignedIn = false;
      state.user = null;
      state.isSidebarVisible = false;
    },
  },
})

export const  {
  setUser,
  setIsSidebarVisible,
  setCars,
  logout,
  setBookmarks,
  setRentedCars,
  setUnavailableCars,
  setTimestamp,
} = appSlice.actions;

export default appSlice.reducer;

export const selectIsSidebarVisible = (state: RootState): boolean =>
  state['reducer'].isSidebarVisible;

export const selectCurrentUser = (state: RootState): User | null =>
  state['reducer'].user;

export const selectAllCars = (state: RootState): Car[] | null =>
  state['reducer'].cars;

export const selectIsSignedIn = (state: RootState): boolean =>
  state['reducer'].isSignedIn;

export const selectUnavailableCarsIds = (state: RootState): string[] =>
  state['reducer'].unavailableCars;

export const selectTimestamp = (state: RootState): number =>
  state['reducer'].timestamp;
