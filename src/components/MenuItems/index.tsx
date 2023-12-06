import { MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function MenuItems() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <MenuItem onClick={() => handleMenuItemClick('/planets')}>
        {t('planets')}
      </MenuItem>
      <MenuItem onClick={() => handleMenuItemClick('/films')}>
        {t('films')}
      </MenuItem>
      <MenuItem onClick={() => handleMenuItemClick('/people')}>
        {t('people')}
      </MenuItem>
    </>
  );
}

export default MenuItems;
