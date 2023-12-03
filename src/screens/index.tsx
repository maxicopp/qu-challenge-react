import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useFilteredPlanets } from '../hooks/useFilteredPlanets';
import Layout from '../components/Layout';
import PlanetTable from '../components/PlanetTable';
import SearchBar from '../components/SearchBar';
import ThemeToggle from '../components/ThemeToggle';

function App() {
  const [search, setSearch] = useState('');
  const { filteredPlanets, loading } = useFilteredPlanets(search);

  if (loading) {
    return (
      <Layout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
          marginTop: 2,
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <ThemeToggle />
        <SearchBar search={search} setSearch={setSearch} />
      </Box>
      <PlanetTable filteredPlanets={filteredPlanets} />
    </Layout>
  );
}

export default App;
