import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PlanetData } from '../../interfaces/PlanetData';
import { Planet, PlanetsResponse } from '../../interfaces/PlanetsResponse';

interface PlanetsState {
  planets: PlanetData[];
  residentNames: Record<string, string[]>;
  loading: boolean;
  pendingRequests: number;
}

export const fetchPlanets = createAsyncThunk(
  'planets/fetchPlanets',
  async () => {
    const response = await fetch('https://swapi.dev/api/planets/');
    const data: PlanetsResponse = await response.json();
    return data.results.map((planet: Planet) => ({
      name: planet.name,
      population: isNaN(parseInt(planet.population, 10))
        ? planet.population
        : parseInt(planet.population, 10),
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
  loading: false,
  pendingRequests: 0,
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
    builder
      .addCase(fetchPlanets.pending, (state) => {
        state.pendingRequests += 1;
        state.loading = state.pendingRequests > 0;
      })
      .addCase(fetchPlanets.fulfilled, (state, action) => {
        state.planets = action.payload;
        state.pendingRequests -= 1;
        state.loading = state.pendingRequests > 0;
      })
      .addCase(fetchPlanets.rejected, (state) => {
        state.pendingRequests -= 1;
        state.loading = state.pendingRequests > 0;
      })
      .addCase(fetchResidents.pending, (state) => {
        state.pendingRequests += 1;
        state.loading = state.pendingRequests > 0;
      })
      .addCase(fetchResidents.fulfilled, (state, action) => {
        state.residentNames[action.payload.planetName] =
          action.payload.residentNames;
        state.pendingRequests -= 1;
        state.loading = state.pendingRequests > 0;
      })
      .addCase(fetchResidents.rejected, (state) => {
        state.pendingRequests -= 1;
        state.loading = state.pendingRequests > 0;
      });
  },
});

export const { setResidentNames } = planetsSlice.actions;

export default planetsSlice.reducer;
