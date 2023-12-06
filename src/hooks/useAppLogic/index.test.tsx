import { renderHook, act } from '@testing-library/react';
import { useAppLogic } from './index';
import { Provider } from 'react-redux';
import { store } from '@store/store';

describe('useAppLogic', () => {
  it('should change search state when setSearch is called', () => {
    const { result } = renderHook(() => useAppLogic(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    act(() => {
      result.current.setSearch('Earth');
    });

    expect(result.current.search).toBe('Earth');
  });

  it('should change sortKey state when handleSortKeyChange is called', () => {
    const { result } = renderHook(() => useAppLogic(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    act(() => {
      result.current.handleSortKeyChange({
        target: { value: 'population' },
      } as any);
    });

    expect(result.current.sortKey).toBe('population');
  });
});
