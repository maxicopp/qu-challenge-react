import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
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
} from '@mui/material';
import { fetchPeopleThunk } from '../../store/people/peopleSlice';

function People() {
  const dispatch: AppDispatch = useDispatch();
  const people = useSelector((state: RootState) => state.people.people);

  useEffect(() => {
    if (people.length === 0) {
      dispatch(fetchPeopleThunk());
    }
  }, [dispatch, people]);

  return (
    <Container>
      <Typography variant="h2">People</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Height</TableCell>
              <TableCell align="right">Mass</TableCell>
              <TableCell align="right">Hair Color</TableCell>
              <TableCell align="right">Skin Color</TableCell>
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
    </Container>
  );
}

export default People;
