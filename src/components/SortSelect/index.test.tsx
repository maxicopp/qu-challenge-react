import { render, fireEvent, screen } from '@testing-library/react';
import SortSelect from './index';

describe('SortSelect', () => {
  it('should render without crashing', () => {
    const mockHandleSortKeyChange = jest.fn();
    render(
      <SortSelect
        sortKey="name"
        handleSortKeyChange={mockHandleSortKeyChange}
      />
    );
  });

  it('should call handleSortKeyChange when a different option is selected', async () => {
    const mockHandleSortKeyChange = jest.fn();
    render(
      <SortSelect
        sortKey="name"
        handleSortKeyChange={mockHandleSortKeyChange}
      />
    );

    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('population'));

    expect(mockHandleSortKeyChange).toHaveBeenCalled();
  });
});
