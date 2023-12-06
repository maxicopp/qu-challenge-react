import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { usePlanets } from './index';

const initialState = {
  planets: {
    planets: [],
    initialLoad: false,
    loadingPlanets: false,
  },
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

describe('usePlanets hook', () => {
  it('should return an object with planets and loading properties', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => usePlanets(), { wrapper });

    expect(result.current).toHaveProperty('planets');
    expect(result.current).toHaveProperty('loading');
  });
});
