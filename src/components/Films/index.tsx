import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  CircularProgress,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { AppDispatch, RootState } from '@store/store';
import { fetchFilmsThunk } from '@store/films/filmsSlice';

function Films() {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const { films, loading } = useSelector((state: RootState) => state.films);

  useEffect(() => {
    if (films.length === 0) {
      dispatch(fetchFilmsThunk());
    }
  }, [dispatch, films]);

  return (
    <Container>
      <Typography variant="h2">{t('films')}</Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('title')}</TableCell>
                <TableCell>{t('directedBy')}</TableCell>
                <TableCell>{t('releasedOn')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {films.map((film) => (
                <TableRow key={film.title}>
                  <TableCell>{film.title}</TableCell>
                  <TableCell>{film.director}</TableCell>
                  <TableCell>{film.release_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default Films;
