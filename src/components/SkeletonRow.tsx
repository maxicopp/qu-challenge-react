import React from 'react';
import { Skeleton, TableRow, TableCell } from '@mui/material';

const SkeletonRow = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" />
      </TableCell>
    </TableRow>
  );
};

export default SkeletonRow;
