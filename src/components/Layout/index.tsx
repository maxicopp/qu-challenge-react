import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
