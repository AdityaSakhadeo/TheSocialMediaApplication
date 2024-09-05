import { createTheme } from '@mui/material/styles';

const breakpoints = createTheme({
  breakpoints: {
    values: {
      xs: 0,        // Extra small devices (phones)
      sm: 600,      // Small devices (tablets)
      md: 960,      // Medium devices (small laptops)
      lg: 1280,     // Large devices (desktops)
      xl: 1920,     // Extra large devices (large desktops)
    },
  },
});

export default breakpoints;
