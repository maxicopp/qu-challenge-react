import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from '@store/people/peopleSlice';
import People from './index';

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

interface PreloadedState {
  people: {
    people: Person[];
    loading: boolean;
    error: null | string;
  };
}

const renderPeopleComponent = (preloadedState: PreloadedState) => {
  const store = configureStore({
    reducer: {
      people: peopleReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <People />
    </Provider>
  );
};

describe('People component', () => {
  it('renders without crashing', () => {
    renderPeopleComponent({
      people: {
        people: [],
        loading: false,
        error: null,
      },
    });

    expect(screen.getByTestId('people-component')).toBeInTheDocument();
  });

  it('displays a list of people', () => {
    const peopleData: Person[] = [
      {
        name: 'John Doe',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        birth_year: '',
        gender: '',
        homeworld: '',
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: '',
        edited: '',
        url: '',
      },
      {
        name: 'Jane Smith',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        birth_year: '',
        gender: '',
        homeworld: '',
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: '',
        edited: '',
        url: '',
      },
    ];
    renderPeopleComponent({
      people: {
        people: peopleData,
        loading: false,
        error: null,
      },
    });
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('shows loading indicator when loading', () => {
    renderPeopleComponent({
      people: {
        people: [],
        loading: true,
        error: null,
      },
    });
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });
});
