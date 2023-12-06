import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@store/theme/themeSlice';
import Layout from './index';

test('renders Layout component in light mode', () => {
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
      <Layout>
        <div>Test child</div>
      </Layout>
    </Provider>
  );

  expect(screen.getByText('Test child')).toBeInTheDocument();
});

test('renders Layout component in dark mode', () => {
  const store = configureStore({
    reducer: {
      theme: themeReducer,
    },
    preloadedState: {
      theme: {
        darkMode: true,
      },
    },
  });

  render(
    <Provider store={store}>
      <Layout>
        <div>Test child</div>
      </Layout>
    </Provider>
  );

  expect(screen.getByText('Test child')).toBeInTheDocument();
});
