import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,        // Extra small devices (phones)
      sm: 600,      // Small devices (tablets)
      md: 960,      // Medium devices (small laptops)
      lg: 1280,     // Large devices (desktops)
      xl: 1920,     // Extra large devices (large desktops)
    },
  },
  palette: {
    primary: {
      main: '#3f51b5',  // Your primary color
    },
    secondary: {
      main: '#f50057',  // Your secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',  // Your font family
  },
});

export default theme;
