import { render, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import RedirectToPlanets from './index';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('RedirectToPlanets', () => {
  it('redirects to /planets after rendering', async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<RedirectToPlanets />);

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/planets'));
  });
});
