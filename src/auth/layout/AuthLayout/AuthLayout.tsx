import { Box, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';
const AuthLayout: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#121621',
      }}
    >
      <Paper
        component="main"
        sx={{
          display: 'flex',
          //flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          //maxWidth: '1200px',
          //borderRadius: '12px',
          //overflow: 'hidden',
          //backgroundColor: '#1f2937',
        }}
      >
        <Outlet />
      </Paper>
    </Box>
  );
};

export default AuthLayout;
