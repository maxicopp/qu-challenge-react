import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Planet from '../Planet';
import { PlanetData } from '@interfaces/PlanetData';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

interface PlanetTableProps {
  filteredPlanets: PlanetData[];
}

function PlanetTable({ filteredPlanets }: Readonly<PlanetTableProps>) {
  const { t } = useTranslation();
  const loadingPlanets = useSelector(
    (state: RootState) => state.planets.loadingPlanets
  );

  if (loadingPlanets) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h2">{t('planets')}</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('name')}</TableCell>
              <TableCell>{t('population')}</TableCell>
              <TableCell>{t('climate')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPlanets.map((planet) => (
              <Planet key={planet.name} {...planet} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default PlanetTable;
