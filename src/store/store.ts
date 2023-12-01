import { configureStore } from '@reduxjs/toolkit';
import planetsReducer from './planets/planetsSlice';

export const store = configureStore({
  reducer: {
    planets: planetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
