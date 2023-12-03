import { configureStore } from '@reduxjs/toolkit';
import planetsReducer from './planets/planetsSlice';
import themeReducer from './theme/themeSlice';
import filmsReducer from './films/filmsSlice';
import peopleReducer from './people/peopleSlice';

export const store = configureStore({
  reducer: {
    planets: planetsReducer,
    theme: themeReducer,
    films: filmsReducer,
    people: peopleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
