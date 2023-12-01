import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PlanetData } from '../../interfaces/PlanetData';
import { PlanetProps } from '../../interfaces/PlanetProps';

interface PlanetsState {
  planets: PlanetData[];
  residentNames: Record<string, string[]>;
}

export const fetchPlanets = createAsyncThunk(
  'planets/fetchPlanets',
  async () => {
    const response = await fetch('https://swapi.dev/api/planets/');
    const data = await response.json();
    return data.results.map((planet: PlanetProps) => ({
      name: planet.name,
      population: planet.population,
      climate: planet.climate,
      residents: planet.residents,
    }));
  }
);

export const fetchResidents = createAsyncThunk(
  'planets/fetchResidents',
  async ({ planetName, urls }: { planetName: string; urls: string[] }) => {
    const responses = await Promise.all(urls.map((url) => fetch(url)));
    const data = await Promise.all(
      responses.map((response) => response.json())
    );
    return { planetName, residentNames: data.map((resident) => resident.name) };
  }
);

const initialState: PlanetsState = {
  planets: [],
  residentNames: {},
};

const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    setResidentNames: (state, action) => {
      state.residentNames[action.payload.planetName] =
        action.payload.residentNames;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlanets.fulfilled, (state, action) => {
      state.planets = action.payload;
    });
    builder.addCase(fetchResidents.fulfilled, (state, action) => {
      state.residentNames[action.payload.planetName] =
        action.payload.residentNames;
    });
  },
});

export const { setResidentNames } = planetsSlice.actions;

export default planetsSlice.reducer;
