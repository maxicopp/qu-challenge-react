import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Film {
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

interface FilmsState {
  films: Film[];
  loading: boolean;
}

export const fetchFilms = createAsyncThunk('films/fetchFilms', async () => {
  const response = await fetch('https://swapi.dev/api/films/');
  const data = await response.json();
  return data.results;
});

const filmsSlice = createSlice({
  name: 'films',
  initialState: { films: [], loading: false } as FilmsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFilms.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      state.films = action.payload;
      state.loading = false;
    });
  },
});

export default filmsSlice.reducer;
