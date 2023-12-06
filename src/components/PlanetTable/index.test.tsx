import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import planetsReducer from '@store/planets/planetsSlice';
import themeReducer from '@store/theme/themeSlice';
import PlanetTable from './index';

describe('PlanetTable', () => {
  it('renders loading indicator when loading', () => {
    const store = configureStore({
      reducer: {
        planets: planetsReducer,
      },
      preloadedState: {
        planets: {
          loadingPlanets: true,
          planets: [],
          residentNames: {},
          loadingResidentPlanet: null,
          pendingRequests: 0,
          initialLoad: false,
        },
      },
    });

    render(
      <Provider store={store}>
        <PlanetTable filteredPlanets={[]} />
      </Provider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders table with planets data when loading is false', () => {
    const store = configureStore({
      reducer: {
        planets: planetsReducer,
        theme: themeReducer,
      },
      preloadedState: {
        planets: {
          loadingPlanets: false,
          planets: [],
          residentNames: {},
          loadingResidentPlanet: null,
          pendingRequests: 0,
          initialLoad: false,
        },
        theme: {
          darkMode: false,
        },
      },
    });

    const planetsData = [
      {
        name: 'Earth',
        population: '7 billion',
        climate: 'temperate',
        residents: [],
      },
    ];

    render(
      <Provider store={store}>
        <PlanetTable filteredPlanets={planetsData} />
      </Provider>
    );

    expect(screen.getByText('Earth')).toBeInTheDocument();
    expect(screen.getByText('7 billion')).toBeInTheDocument();
    expect(screen.getByText('temperate')).toBeInTheDocument();
  });
});
