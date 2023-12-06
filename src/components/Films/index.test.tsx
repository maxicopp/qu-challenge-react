import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Films from './index';
import filmsReducer from '@store/films/filmsSlice';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Films Component', () => {
  const renderFilmsComponent = (initialState: any) => {
    const store = configureStore({
      reducer: {
        films: filmsReducer,
      },
      preloadedState: initialState,
    });

    return render(
      <Provider store={store}>
        <Films />
      </Provider>
    );
  };

  it('should render loading spinner when loading is true', () => {
    renderFilmsComponent({
      films: {
        loading: true,
        films: [],
      },
    });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render films list when loading is false', async () => {
    const fakeFilms = [
      { title: 'A New Hope', opening_crawl: 'It is a period of civil war...' },
    ];

    renderFilmsComponent({
      films: {
        loading: false,
        films: fakeFilms,
      },
    });

    await waitFor(() => {
      fakeFilms.forEach((film) => {
        expect(screen.getByText(film.title)).toBeInTheDocument();
      });
    });
  });
});
