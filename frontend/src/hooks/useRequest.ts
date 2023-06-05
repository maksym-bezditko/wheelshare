import { useCallback } from "react";
import { useAppDispatch } from "../app/hooks";
import axios from "axios";
import { setCars, setUser, setBookmarks, setRentedCars, setUnavailableCars } from "../app/slice";
import { RentedCar } from "../models";

const requestUrl = 'http://localhost:3001/api/'

type SignInPayload = {
  email: string;
  password: string;
}

type SignUpPayload = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  bank: string;
  cardNumber: string;
  cardTerm: string;
  cvv: string;
  rentedCars: [];
  bookmarkedCars: [],
}

type Result = {
  getAllCars: () => Promise<void>;
  signIn: (payload: SignInPayload) => Promise<boolean>;
  signUp: (payload: SignUpPayload) => Promise<boolean>;
  checkEmail: (email: string) => Promise<boolean>;
  toggleBookmark: (userId: string, carId: string) => Promise<boolean>;
  toggleRentedCar: (userId: string, car: RentedCar) => Promise<boolean>;
  refreshRentedCars: (userId: string) => Promise<void>;
  refreshUserData: (userId: string) => Promise<void>;
}

export const useRequest = (): Result => {
  const dispatch = useAppDispatch();

  const getUnavailableCarsIds = useCallback(async () => {
    dispatch(setUnavailableCars((await axios.get(requestUrl + "cars/unavailable")).data || []))
  }, [dispatch]);

  const refreshRentedCars = useCallback(async (userId: string) => {
    await axios.post(requestUrl + "refreshRentedCars", {
      userId,
    });
  }, []);

  const refreshUserData = useCallback(async (userId: string) => {
    const res = await axios.post(requestUrl + "refreshUserData", {
      userId,
    });

    dispatch(setUser(res.data));
  }, [dispatch]);

  const getAllCars = useCallback(async () => {
    let carsArray = [];

    try {
      const cars = (await axios.get(requestUrl + "cars/all")).data || [];

      carsArray = cars;
    } catch {
      carsArray = [];
    }

    dispatch(setCars(carsArray))

    getUnavailableCarsIds();
  }, [dispatch, getUnavailableCarsIds]);

  const signIn = useCallback(async (payload: SignInPayload) => {
    try {
      const res = await axios.post(requestUrl + "login", payload);

      if (res.status === 200) {

        dispatch(setUser(res.data));

        return true;
      }

      dispatch(setUser(null));

      return false;
    } catch {
      dispatch(setUser(null));
      return false;
    }
  }, [dispatch]);

  const signUp = useCallback(async (payload: SignUpPayload) => {
    try {
      const res = await axios.post(requestUrl + "registration", payload);

      if (res.status === 200) {

        dispatch(setUser(res.data));

        return true;
      }

      dispatch(setUser(null));
      return false;

    } catch {
      dispatch(setUser(null));
      return false;
    }
  }, [dispatch]);

  const checkEmail = useCallback(async (email: string) => {
    try {
      const res = await axios.post(requestUrl + "checkEmail", {
        email
      });

      return res.status === 200;

    } catch {
      return false;
    }
  }, []);

  const toggleBookmark = useCallback(async (userId: string, carId: string) => {
    try {
      const res = await axios.post(requestUrl + "toggleUserBookmark", {
        userId,
        carId
      });

      if (res.status === 200) {
        dispatch(setBookmarks(res.data));

        return true;
      }

      return false;
    } catch {
      return false;
    }
  }, [dispatch]);

  const toggleRentedCar = useCallback(async (userId: string, car: RentedCar) => {
    try {
      const res = await axios.post(requestUrl + "toggleRentedCar", {
        userId,
        car
      });

      if (res.status === 200) {
        dispatch(setRentedCars(res.data));

        getUnavailableCarsIds();

        return true;
      }

      return false;
    } catch {
      return false;
    }
  }, [dispatch, getUnavailableCarsIds]);

  return {
    getAllCars,
    signIn,
    signUp,
    checkEmail,
    toggleBookmark,
    toggleRentedCar,
    refreshRentedCars,
    refreshUserData,
  }
};