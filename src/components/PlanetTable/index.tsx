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
} from '@mui/material';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import SkeletonRow from '../SkeletonRow';
import Planet from '../Planet';
import { PlanetData } from '../../interfaces/PlanetData';

interface PlanetTableProps {
  filteredPlanets: PlanetData[];
}

function PlanetTable({ filteredPlanets }: Readonly<PlanetTableProps>) {
  const { t } = useTranslation();
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
              <Suspense key={planet.name} fallback={<SkeletonRow />}>
                <Planet {...planet} />
              </Suspense>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default PlanetTable;
