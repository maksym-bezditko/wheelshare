import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from './slice';

export const store = configureStore({
  reducer: {
    [appReducer.name]: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
