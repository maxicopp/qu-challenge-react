import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import MenuItems from './index';

describe('MenuItems', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <MenuItems />
        </I18nextProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Planets')).toBeInTheDocument();
    expect(screen.getByText('Films')).toBeInTheDocument();
    expect(screen.getByText('People')).toBeInTheDocument();
  });

  it('navigates on click', () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <MenuItems />
        </I18nextProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Planets'));
    expect(window.location.pathname).toBe('/planets');

    fireEvent.click(screen.getByText('Films'));
    expect(window.location.pathname).toBe('/films');

    fireEvent.click(screen.getByText('People'));
    expect(window.location.pathname).toBe('/people');
  });
});
