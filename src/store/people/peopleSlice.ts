import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Person {
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

interface PeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

interface PeopleState {
  people: Person[];
  loading: boolean;
}

export const fetchPeople = createAsyncThunk('people/fetchPeople', async () => {
  const response = await fetch('https://swapi.dev/api/people/');
  const data: PeopleResponse = await response.json();
  return data.results;
});

const peopleSlice = createSlice({
  name: 'people',
  initialState: { people: [], loading: false } as PeopleState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPeople.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPeople.fulfilled, (state, action) => {
      state.people = action.payload;
      state.loading = false;
    });
  },
});

export default peopleSlice.reducer;
