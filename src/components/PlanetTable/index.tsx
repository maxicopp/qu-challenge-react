import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Suspense } from 'react';
import SkeletonRow from '../SkeletonRow';
import Planet from '../Planet';
import { PlanetData } from '../../interfaces/PlanetData';

interface PlanetTableProps {
  filteredPlanets: PlanetData[];
}

function PlanetTable({ filteredPlanets }: PlanetTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Population</TableCell>
            <TableCell>Climate</TableCell>
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
  );
}

export default PlanetTable;
