import { render, fireEvent, screen } from '@testing-library/react';
import SearchAndSort from './index';

describe('SearchAndSort', () => {
  it('renders SearchBar and SortSelect components', () => {
    const mockSetSearch = jest.fn();
    const mockHandleSortKeyChange = jest.fn();

    render(
      <SearchAndSort
        search="test"
        setSearch={mockSetSearch}
        sortKey="name"
        handleSortKeyChange={mockHandleSortKeyChange}
      />
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('calls setSearch and handleSortKeyChange on input changes', () => {
    const mockSetSearch = jest.fn();
    const mockHandleSortKeyChange = jest.fn();

    render(
      <SearchAndSort
        search="test"
        setSearch={mockSetSearch}
        sortKey="name"
        handleSortKeyChange={mockHandleSortKeyChange}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'earth' },
    });
    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('population'));

    expect(mockSetSearch).toHaveBeenCalledWith('earth');
    expect(mockHandleSortKeyChange).toHaveBeenCalled();
  });
});
