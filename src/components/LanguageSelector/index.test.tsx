import { render, fireEvent, screen } from '@testing-library/react';
import LanguageSelector from './index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('LanguageSelector', () => {
  it('renders without crashing', () => {
    render(<LanguageSelector />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('changes language when a different option is selected', () => {
    render(<LanguageSelector />);
    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('🇦🇷'));
    expect(localStorage.getItem('i18nextLng')).toBe('es');
  });
});
