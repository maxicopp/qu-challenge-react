import React, { useState, Dispatch, ReactNode, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  SelectChangeEvent,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Select,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Layout from '../../components/Layout';
import SearchBar from '../../components/SearchBar';
import ThemeToggle from '../../components/ThemeToggle';
import SortSelect from '../../components/SortSelect';
import { PlanetDataKeys } from '../../interfaces/PlanetDataKeys';
import { RootState } from '../../store/store';

import styles from './styles';

const DEFAULT_LANG = 'en';

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
}: Readonly<MainLayoutProps>) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isDarkMode = useSelector((state: RootState) => state.theme.darkMode);
  const initialLang = ['en', 'es'].includes(i18n.language)
    ? i18n.language
    : DEFAULT_LANG;
  const [lang, setLang] = useState(initialLang);

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

  const handleLangChange = (event: SelectChangeEvent) => {
    const newLang = event.target.value;
    setLang(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
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
              {t('planets')}
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/films')}>
              {t('films')}
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/people')}>
              {t('people')}
            </MenuItem>
          </Menu>
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
          <Box marginLeft={'auto'}>
            <Box display="flex" alignItems="center">
              <Select value={lang} onChange={handleLangChange}>
                <MenuItem value="en">🇺🇸</MenuItem>
                <MenuItem value="es">🇦🇷</MenuItem>
              </Select>
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
