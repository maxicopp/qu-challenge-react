import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@store/theme/themeSlice';
import LoadingLayout from './index';

describe('LoadingLayout', () => {
  test('renders LoadingLayout component', () => {
    const store = configureStore({
      reducer: {
        theme: themeReducer,
      },
      preloadedState: {
        theme: {
          darkMode: false,
        },
      },
    });

    render(
      <Provider store={store}>
        <LoadingLayout />
      </Provider>
    );

    const circularProgress = screen.getByRole('progressbar');
    expect(circularProgress).toBeInTheDocument();
  });
});
