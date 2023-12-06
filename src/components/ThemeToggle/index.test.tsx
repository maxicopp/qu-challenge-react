import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import ThemeToggle from '@components/ThemeToggle';

describe('ThemeToggle', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
