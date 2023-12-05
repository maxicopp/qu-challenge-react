import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPeople } from '../../api/peopleApi';

export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface PeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

export interface PeopleState {
  people: Person[];
  loading: boolean;
}

export const fetchPeopleThunk = createAsyncThunk(
  'people/fetchPeople',
  fetchPeople
);

const peopleSlice = createSlice({
  name: 'people',
  initialState: { people: [], loading: false } as PeopleState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPeopleThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPeopleThunk.fulfilled, (state, action) => {
      state.people = action.payload;
      state.loading = false;
    });
  },
});

export default peopleSlice.reducer;
