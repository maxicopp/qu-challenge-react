import { Dispatch, SetStateAction } from 'react';
import { Box, SelectChangeEvent } from '@mui/material';
import { PlanetDataKeys } from '@interfaces/PlanetDataKeys';
import SearchBar from '../SearchBar';
import SortSelect from '../SortSelect';

import styles from './styles';

interface SearchAndSortProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  sortKey: PlanetDataKeys;
  handleSortKeyChange: (event: SelectChangeEvent<string>) => void;
}

function SearchAndSort({
  search,
  setSearch,
  sortKey,
  handleSortKeyChange,
}: SearchAndSortProps) {
  return (
    <Box sx={styles.boxStyles}>
      {search !== undefined && setSearch !== undefined && (
        <Box marginRight={2}>
          <SearchBar search={search} setSearch={setSearch} />
        </Box>
      )}
      {sortKey !== undefined && handleSortKeyChange !== undefined && (
        <Box>
          <SortSelect
            sortKey={sortKey}
            handleSortKeyChange={handleSortKeyChange}
          />
        </Box>
      )}
    </Box>
  );
}

export default SearchAndSort;
