import React from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { PlanetDataKeys } from '../../interfaces/PlanetDataKeys';

interface SortSelectProps {
  sortKey: PlanetDataKeys;
  handleSortKeyChange: (event: SelectChangeEvent<string>) => void;
}

function SortSelect({
  sortKey,
  handleSortKeyChange,
}: Readonly<SortSelectProps>) {
  const { t } = useTranslation();
  return (
    <Select value={sortKey} onChange={handleSortKeyChange}>
      <MenuItem value="name">{t('name')}</MenuItem>
      <MenuItem value="population">{t('population')}</MenuItem>
      <MenuItem value="climate">{t('climate')}</MenuItem>
    </Select>
  );
}

export default SortSelect;
