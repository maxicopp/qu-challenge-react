import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

const DEFAULT_LANG = 'en';

function LanguageSelector() {
  const { i18n } = useTranslation();
  const initialLang = ['en', 'es'].includes(i18n.language)
    ? i18n.language
    : DEFAULT_LANG;
  const [lang, setLang] = useState(initialLang);

  const handleLangChange = (event: SelectChangeEvent) => {
    const newLang = event.target.value;
    setLang(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  return (
    <Select value={lang} onChange={handleLangChange}>
      <MenuItem value="en">🇺🇸</MenuItem>
      <MenuItem value="es">🇦🇷</MenuItem>
    </Select>
  );
}

export default LanguageSelector;
