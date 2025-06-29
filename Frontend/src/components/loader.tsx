import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => (
  <Box
    sx={{
      position: 'fixed', 
      top: 0,
      left: 0,
      height: '100vh',
      width: '100vw',
      backgroundColor: 'rgba(255, 255, 255, 0.7)', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,     }}
  >
    <CircularProgress />
  </Box>
);

export default Loader;