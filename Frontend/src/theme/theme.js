import { createTheme } from '@mui/material/styles';
import breakpoints from './breakpoints';

const theme = createTheme({
  ...breakpoints,
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
