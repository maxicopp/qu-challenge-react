import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, IconButton, Menu, Box } from '@mui/material';
import { MainLayoutProps } from '@interfaces/MainLayoutProps';
import { RootState } from '@store/store';
import LanguageSelector from '@components/LanguageSelector';
import Layout from '@components/Layout';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItems from '@components/MenuItems';
import SearchAndSort from '@components/SearchAndSort';
import ThemeToggle from '@components/ThemeToggle';

function MainLayout({
  search,
  setSearch,
  sortKey,
  handleSortKeyChange,
  children,
}: Readonly<MainLayoutProps>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isDarkMode = useSelector((state: RootState) => state.theme.darkMode);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
            <MenuItems />
          </Menu>
          <SearchAndSort
            search={search}
            setSearch={setSearch}
            sortKey={sortKey}
            handleSortKeyChange={handleSortKeyChange}
          />
          <Box marginLeft={'auto'}>
            <Box display="flex" alignItems="center">
              <LanguageSelector />
              <ThemeToggle />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {children}
    </Layout>
  );
}

export default MainLayout;
