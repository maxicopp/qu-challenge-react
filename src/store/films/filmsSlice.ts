import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFilms } from '../../api/filmsApi';

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface FilmsState {
  films: Film[];
  loading: boolean;
}

export const fetchFilmsThunk = createAsyncThunk('films/fetchFilms', fetchFilms);

const filmsSlice = createSlice({
  name: 'films',
  initialState: { films: [], loading: false } as FilmsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFilmsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilmsThunk.fulfilled, (state, action) => {
      state.films = action.payload;
      state.loading = false;
    });
  },
});

export default filmsSlice.reducer;
