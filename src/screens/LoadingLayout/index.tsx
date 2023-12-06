import { Box, CircularProgress } from '@mui/material';
import Layout from '@components/Layout';

import styles from './styles';

function LoadingLayout() {
  return (
    <Layout>
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    </Layout>
  );
}

export default LoadingLayout;
