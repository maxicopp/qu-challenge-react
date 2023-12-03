import React from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { PlanetDataKeys } from '../../interfaces/PlanetDataKeys';

interface SortSelectProps {
  sortKey: PlanetDataKeys;
  handleSortKeyChange: (event: SelectChangeEvent<string>) => void;
}

function SortSelect({ sortKey, handleSortKeyChange }: SortSelectProps) {
  return (
    <Select value={sortKey} onChange={handleSortKeyChange}>
      <MenuItem value="name">Name</MenuItem>
      <MenuItem value="population">Population</MenuItem>
      <MenuItem value="climate">Climate</MenuItem>
    </Select>
  );
}

export default SortSelect;
