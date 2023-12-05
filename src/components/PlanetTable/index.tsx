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
import { PlanetData } from '../../interfaces/PlanetData';
import { useAppLogic } from '../../hooks/useAppLogic';

interface PlanetTableProps {
  filteredPlanets: PlanetData[];
}

function PlanetTable({ filteredPlanets }: Readonly<PlanetTableProps>) {
  const { t } = useTranslation();
  const { loading } = useAppLogic();

  return (
    <Container>
      <Typography variant="h2">{t('planets')}</Typography>

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
                <TableCell>{t('population')}</TableCell>
                <TableCell>{t('climate')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPlanets.map((planet) => (
                <Planet {...planet} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default PlanetTable;
