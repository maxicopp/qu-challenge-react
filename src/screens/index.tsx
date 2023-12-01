import React, { Suspense, lazy, useState, useEffect } from 'react';
import { usePlanets } from '../hooks/usePlanets';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Search, Brightness4, Brightness7 } from '@mui/icons-material';
import SkeletonRow from '../components/SkeletonRow';

const Planet = lazy(() => import('../components/Planet/index'));

function App() {
  const { planets, loading } = usePlanets();
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const filteredPlanets = planets.filter((planet) =>
    planet.name.toLowerCase().includes(search.toLowerCase())
  );

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  if (loading) {
    return (
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Population</TableCell>
                <TableCell>Climate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <SkeletonRow />
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
          marginTop: 2,
        }}
      >
        <Tooltip title="Toggle Dark/Light Mode">
          <IconButton onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Population</TableCell>
              <TableCell>Climate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPlanets.map((planet) => (
              <Suspense key={planet.name} fallback={<SkeletonRow />}>
                <Planet {...planet} darkMode={darkMode} />
              </Suspense>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export default App;
