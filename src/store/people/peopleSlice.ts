import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPeople } from '@api/peopleApi';
import { Person } from '@interfaces/Person';

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
