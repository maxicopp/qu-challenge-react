import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { AppDispatch, RootState } from '../../store/store';
import { fetchFilmsThunk } from '../../store/films/filmsSlice';

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
        films.map((film) => (
          <Card key={film.title}>
            <CardContent>
              <Typography variant="h5">{film.title}</Typography>
              <Typography variant="subtitle1">
                {t('directedBy')} {film.director}
              </Typography>
              <Typography variant="subtitle2">
                {t('releasedOn')} {film.release_date}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}

export default Films;
