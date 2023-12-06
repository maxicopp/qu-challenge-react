import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFilms } from '@api/filmsApi';
import { Film } from '@interfaces/Film';

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
