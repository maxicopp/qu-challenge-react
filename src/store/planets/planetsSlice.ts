import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PlanetData } from '../../interfaces/PlanetData';
import { fetchPlanets, fetchResidents } from '../../api/planetsApi';

interface PlanetsState {
  planets: PlanetData[];
  residentNames: Record<string, string[]>;
  loadingPlanets: boolean;
  loadingResidentPlanet: string | null;
  pendingRequests: number;
  initialLoad: boolean;
}

export const fetchPlanetsThunk = createAsyncThunk(
  'planets/fetchPlanets',
  fetchPlanets
);

export const fetchResidentsThunk = createAsyncThunk(
  'planets/fetchResidents',
  fetchResidents
);

const initialState: PlanetsState = {
  planets: [],
  residentNames: {},
  loadingPlanets: false,
  loadingResidentPlanet: null,
  pendingRequests: 0,
  initialLoad: false,
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
      .addCase(fetchPlanetsThunk.pending, (state) => {
        state.pendingRequests += 1;
        state.loadingPlanets = state.pendingRequests > 0;
      })
      .addCase(fetchPlanetsThunk.fulfilled, (state, action) => {
        state.planets = action.payload;
        state.pendingRequests -= 1;
        state.loadingPlanets = state.pendingRequests > 0;
        state.initialLoad = true;
      })
      .addCase(fetchPlanetsThunk.rejected, (state) => {
        state.pendingRequests -= 1;
        state.loadingPlanets = state.pendingRequests > 0;
      })
      .addCase(fetchResidentsThunk.pending, (state, action) => {
        state.pendingRequests += 1;
        state.loadingResidentPlanet = action.meta.arg.planetName;
      })
      .addCase(fetchResidentsThunk.fulfilled, (state, action) => {
        state.residentNames[action.payload.planetName] =
          action.payload.residentNames;
        state.pendingRequests -= 1;
        state.loadingResidentPlanet = null;
      })
      .addCase(fetchResidentsThunk.rejected, (state) => {
        state.pendingRequests -= 1;
        state.loadingResidentPlanet = null;
      });
  },
});

export const { setResidentNames } = planetsSlice.actions;

export default planetsSlice.reducer;
