import { configureStore } from '@reduxjs/toolkit';
import planetsReducer from './planets/planetsSlice';
import themeReducer from './theme/themeSlice';

export const store = configureStore({
  reducer: {
    planets: planetsReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
