import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { AppDispatch, RootState } from '@store/store';
import { fetchPeopleThunk } from '@store/people/peopleSlice';

function People() {
  const dispatch: AppDispatch = useDispatch();
  const people = useSelector((state: RootState) => state.people.people);
  const loading = useSelector((state: RootState) => state.people.loading);
  const { t } = useTranslation();

  useEffect(() => {
    if (people.length === 0) {
      dispatch(fetchPeopleThunk());
    }
  }, [dispatch, people]);

  return (
    <Container>
      <Typography variant="h2">{t('people')}</Typography>
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
                <TableCell>{t('name')}</TableCell>
                <TableCell align="right">{t('height')}</TableCell>
                <TableCell align="right">{t('mass')}</TableCell>
                <TableCell align="right">{t('hairColor')}</TableCell>
                <TableCell align="right">{t('skinColor')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {people.map((person) => (
                <TableRow key={person.name}>
                  <TableCell component="th" scope="row">
                    {person.name}
                  </TableCell>
                  <TableCell align="right">{person.height}</TableCell>
                  <TableCell align="right">{person.mass}</TableCell>
                  <TableCell align="right">{person.hair_color}</TableCell>
                  <TableCell align="right">{person.skin_color}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default People;
