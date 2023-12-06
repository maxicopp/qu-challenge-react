import { Dispatch, ReactNode, SetStateAction } from 'react';
import { PlanetDataKeys } from './PlanetDataKeys';
import { SelectChangeEvent } from '@mui/material';

export interface MainLayoutProps {
  search?: string;
  setSearch?: Dispatch<SetStateAction<string>>;
  sortKey?: PlanetDataKeys;
  handleSortKeyChange?: (event: SelectChangeEvent<string>) => void;
  children: ReactNode;
}
