import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, Store } from '@reduxjs/toolkit';
import reducer from '../../store/planets/planetsSlice';
import themeReducer from '../../store/theme/themeSlice';
import Planet from './index';

const renderWithRedux = (
  component: React.ReactElement,
  {
    initialState,
    store = configureStore({
      reducer: {
        planets: reducer,
        theme: themeReducer,
      },
      preloadedState: initialState,
    }),
  }: { initialState?: any; store?: Store } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('Planet', () => {
  it('renders without crashing', () => {
    renderWithRedux(
      <Planet
        name="Earth"
        population="7 billion"
        climate="Moderate"
        residents={[]}
      />
    );
    expect(screen.getByText('Earth')).toBeInTheDocument();
  });

  it('toggles open state on click', () => {
    renderWithRedux(
      <Planet
        name="Earth"
        population="7 billion"
        climate="Moderate"
        residents={[]}
      />
    );
    const row = screen.getByText('Earth');
    fireEvent.click(row);

    expect(row).toBeInTheDocument();
  });
});
