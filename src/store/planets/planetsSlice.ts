import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PlanetData } from '../../interfaces/PlanetData';
import { fetchPlanets, fetchResidents } from '../../api/planetsApi';

interface PlanetsState {
  planets: PlanetData[];
  residentNames: Record<string, string[]>;
  loading: boolean;
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
  loading: false,
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
        state.loading = state.pendingRequests > 0;
      })
      .addCase(fetchPlanetsThunk.fulfilled, (state, action) => {
        state.planets = action.payload;
        state.pendingRequests -= 1;
        state.loading = state.pendingRequests > 0;
        state.initialLoad = true;
      })
      .addCase(fetchPlanetsThunk.rejected, (state) => {
        state.pendingRequests -= 1;
        state.loading = state.pendingRequests > 0;
      })
      .addCase(fetchResidentsThunk.pending, (state) => {
        state.pendingRequests += 1;
        state.loading = state.pendingRequests > 0;
      })
      .addCase(fetchResidentsThunk.fulfilled, (state, action) => {
        state.residentNames[action.payload.planetName] =
          action.payload.residentNames;
        state.pendingRequests -= 1;
        state.loading = state.pendingRequests > 0;
      })
      .addCase(fetchResidentsThunk.rejected, (state) => {
        state.pendingRequests -= 1;
        state.loading = state.pendingRequests > 0;
      });
  },
});

export const { setResidentNames } = planetsSlice.actions;

export default planetsSlice.reducer;
