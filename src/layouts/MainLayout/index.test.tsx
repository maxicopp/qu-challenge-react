import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '@store/store';
import MainLayout from './index';

describe('MainLayout', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Router>
          <MainLayout>
            <div>Test Child</div>
          </MainLayout>
        </Router>
      </Provider>
    );
  });

  it('opens menu on menu button click', () => {
    render(
      <Provider store={store}>
        <Router>
          <MainLayout>
            <div>Test Child</div>
          </MainLayout>
        </Router>
      </Provider>
    );

    const menuButton = screen.getByLabelText('menu');
    fireEvent.click(menuButton);

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});
