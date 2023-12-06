import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@store/theme/themeSlice';
import peopleReducer from '@store/people/peopleSlice';
import PeopleRoute from './index';

describe('PeopleRoute', () => {
  test('renders PeopleRoute component', () => {
    const store = configureStore({
      reducer: {
        theme: themeReducer,
        people: peopleReducer,
      },
      preloadedState: {
        theme: {
          darkMode: false,
        },
        people: {
          people: [],
          loading: false,
        },
      },
    });

    render(
      <Provider store={store}>
        <PeopleRoute />
      </Provider>
    );

    const peopleComponent = screen.getByTestId('people-component');
    expect(peopleComponent).toBeInTheDocument();
  });
});
