import { Box, CircularProgress } from '@mui/material';
import Layout from '../../components/Layout';

function LoadingLayout() {
  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    </Layout>
  );
}

export default LoadingLayout;
