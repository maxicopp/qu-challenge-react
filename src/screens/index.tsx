import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useFilteredPlanets } from '../hooks/useFilteredPlanets';
import Layout from '../components/Layout';
import PlanetTable from '../components/PlanetTable';
import SearchBar from '../components/SearchBar';
import ThemeToggle from '../components/ThemeToggle';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { usePlanets } from '../hooks/usePlanets';
import { PlanetData } from '../interfaces/PlanetData';

type PlanetDataKeys = Extract<keyof PlanetData, string>;

function App() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const { planets, loading } = usePlanets();
  const { filteredPlanets } = useFilteredPlanets(search, planets, loading);
  const initialLoad = useSelector(
    (state: RootState) => state.planets.initialLoad
  );

  const handleSortKeyChange = (event: SelectChangeEvent<string>) => {
    setSortKey(event.target.value as PlanetDataKeys);
  };

  const sortedPlanets = [...filteredPlanets].sort((a, b) => {
    const aValue = a[sortKey as PlanetDataKeys];
    const bValue = b[sortKey as PlanetDataKeys];

    if (sortKey === 'population') {
      if (aValue === 'unknown') return 1;
      if (bValue === 'unknown') return -1;
      return Number(aValue) - Number(bValue);
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue);
    }

    return 0;
  });

  if (loading && !initialLoad) {
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
        <Select value={sortKey} onChange={handleSortKeyChange}>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="population">Population</MenuItem>
          <MenuItem value="climate">Climate</MenuItem>
        </Select>
      </Box>
      <PlanetTable filteredPlanets={sortedPlanets} />
    </Layout>
  );
}

export default App;
