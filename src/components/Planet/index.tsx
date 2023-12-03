import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  LinearProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  fetchResidents,
  setResidentNames,
} from '../../store/planets/planetsSlice';
import { AppDispatch, RootState } from '../../store/store';
import { PlanetProps } from '../../interfaces/PlanetProps';

function Planet({
  name,
  population,
  climate,
  residents,
}: Omit<Readonly<PlanetProps>, 'darkMode'>) {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const dispatch: AppDispatch = useDispatch();
  const residentNames = useSelector(
    (state: RootState) => state.planets.residentNames
  );
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const handleRowClick = () => {
    setOpen(!open);
    if (!open && residentNames[name] === undefined) {
      if (residents.length > 0) {
        dispatch(fetchResidents({ planetName: name, urls: residents }));
      } else {
        dispatch(setResidentNames({ planetName: name, residentNames: [] }));
      }
    }
  };

  return (
    <>
      <TableRow
        onClick={handleRowClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={
          hover ? { backgroundColor: darkMode ? '#555555' : '#f5f5f5' } : {}
        }
      >
        <TableCell>{name}</TableCell>
        <TableCell>{population}</TableCell>
        <TableCell>{climate}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {residentNames[name] === undefined && <LinearProgress />}
            {residentNames[name]?.length === 0 && (
              <Paper
                style={{
                  padding: '16px',
                  margin: '16px 0',
                  textAlign: 'center',
                }}
              >
                <Typography variant="subtitle1">
                  Este planeta parece desolado, ¡no se encontraron residentes!
                </Typography>
              </Paper>
            )}
            <Box margin={1}>
              {residentNames[name]?.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom component="div">
                    Residents
                  </Typography>
                  <List>
                    {residentNames[name]?.map((residentName: string) => (
                      <ListItem key={residentName}>
                        <ListItemText primary={residentName} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Planet;
