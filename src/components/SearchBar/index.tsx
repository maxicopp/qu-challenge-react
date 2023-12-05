import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

interface SearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({ search, setSearch }: Readonly<SearchBarProps>) {
  return (
    <TextField
      label="Search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;
