import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from './index';

describe('SearchBar', () => {
  it('should update search value on input change', () => {
    const setSearch = jest.fn();
    render(<SearchBar search="" setSearch={setSearch} />);

    fireEvent.change(screen.getByLabelText('search'), {
      target: { value: 'test' },
    });

    expect(setSearch).toHaveBeenCalledWith('test');
  });
});
