import React from 'react';
import { Skeleton } from '@mui/material';
import { TableRow, TableCell } from '@mui/material';

function SkeletonRow() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
    </TableRow>
  );
}

export default SkeletonRow;
