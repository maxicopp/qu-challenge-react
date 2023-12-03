import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { fetchFilms } from '../../store/films/filmsSlice';
import { AppDispatch, RootState } from '../../store/store';

function Films() {
  const dispatch: AppDispatch = useDispatch();
  const { films, loading } = useSelector((state: RootState) => state.films);

  useEffect(() => {
    if (films.length === 0) {
      dispatch(fetchFilms());
    }
  }, [dispatch, films]);

  return (
    <Container>
      <Typography variant="h2">Films</Typography>
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
                Directed by {film.director}
              </Typography>
              <Typography variant="subtitle2">
                Released on {film.release_date}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}

export default Films;
