import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import FilmsRoute from './index';
import { store } from '../../store/store';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
  i18n: {
    language: 'en',
    changeLanguage: jest.fn(),
  },
}));

describe('FilmsRoute', () => {
  it('should render Films component', async () => {
    render(
      <Provider store={store}>
        <Router>
          <FilmsRoute />
        </Router>
      </Provider>
    );

    const filmsComponent = await screen.findByTestId('films-component');

    expect(filmsComponent).toBeInTheDocument();
  });
});
