import React from 'react';
import { Box, SelectChangeEvent } from '@mui/material';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import Layout from '../../components/Layout';
import SearchBar from '../../components/SearchBar';
import ThemeToggle from '../../components/ThemeToggle';
import SortSelect from '../../components/SortSelect';
import { PlanetDataKeys } from '../../interfaces/PlanetDataKeys';

interface MainLayoutProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  sortKey: PlanetDataKeys;
  handleSortKeyChange: (event: SelectChangeEvent<string>) => void;
  children: ReactNode;
}

function MainLayout({
  search,
  setSearch,
  sortKey,
  handleSortKeyChange,
  children,
}: MainLayoutProps) {
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
        <SortSelect
          sortKey={sortKey}
          handleSortKeyChange={handleSortKeyChange}
        />
      </Box>
      {children}
    </Layout>
  );
}

export default MainLayout;
