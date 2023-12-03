import React, { useState } from 'react';
import {
  Box,
  SelectChangeEvent,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import Layout from '../../components/Layout';
import SearchBar from '../../components/SearchBar';
import ThemeToggle from '../../components/ThemeToggle';
import SortSelect from '../../components/SortSelect';
import { PlanetDataKeys } from '../../interfaces/PlanetDataKeys';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface MainLayoutProps {
  search?: string;
  setSearch?: Dispatch<SetStateAction<string>>;
  sortKey?: PlanetDataKeys;
  handleSortKeyChange?: (event: SelectChangeEvent<string>) => void;
  children: ReactNode;
}

function MainLayout({
  search,
  setSearch,
  sortKey,
  handleSortKeyChange,
  children,
}: MainLayoutProps) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isDarkMode = useSelector((state: RootState) => state.theme.darkMode);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleMenuClose();
  };
  return (
    <Layout>
      <AppBar position="static" color={isDarkMode ? 'primary' : 'inherit'}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleMenuItemClick('/planets')}>
              Planets
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/films')}>
              Films
            </MenuItem>
          </Menu>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: 2,
              marginTop: 2,
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
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
          <Box marginLeft={'auto'}>
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>
      {children}
    </Layout>
  );
}

export default MainLayout;
