import { render, screen } from '@testing-library/react';
import { useAppLogic } from '@hooks/useAppLogic';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import PlanetsRoute from './index';

jest.mock('@hooks/useAppLogic', () => ({
  __esModule: true,
  useAppLogic: jest.fn(),
}));

describe('PlanetsRoute', () => {
  beforeEach(() => {
    (useAppLogic as jest.Mock).mockReturnValue({
      search: '',
      setSearch: jest.fn(),
      sortKey: '',
      handleSortKeyChange: jest.fn(),
      sortedPlanets: [],
    });
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <PlanetsRoute />
      </Provider>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
