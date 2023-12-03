import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { useSelector } from 'react-redux';
import { PlanetData } from '../../interfaces/PlanetData';
import { usePlanets } from '../usePlanets';
import { useFilteredPlanets } from '../useFilteredPlanets';
import { RootState } from '../../store/store';
import { PlanetDataKeys } from '../../interfaces/PlanetDataKeys';

export function useAppLogic() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<PlanetDataKeys>('name');
  const { planets, loading } = usePlanets();
  const { filteredPlanets } = useFilteredPlanets(search, planets, loading);
  const initialLoad = useSelector(
    (state: RootState) => state.planets.initialLoad
  );

  const handleSortKeyChange = (event: SelectChangeEvent<string>) => {
    setSortKey(event.target.value as PlanetDataKeys);
  };

  const sortedPlanets = sortPlanets(filteredPlanets, sortKey);

  return {
    search,
    setSearch,
    sortKey,
    handleSortKeyChange,
    sortedPlanets,
    loading,
    initialLoad,
  };
}

function sortPlanets(planets: PlanetData[], sortKey: PlanetDataKeys) {
  return [...planets].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

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
}
