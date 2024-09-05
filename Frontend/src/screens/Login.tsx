import { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Container, Box, Divider, Link as MuiLink, ThemeProvider } from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon, Twitter as TwitterIcon } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import loginImage from '../assets/login_image.jpeg';
import theme from '../theme/theme';

export default function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('token', result.token);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Full Height and Width Container */}
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: '#ffe6e6',
          overflow: 'hidden', // Prevent scrollbars from appearing
          padding: 0,         // Remove padding
          margin: 0,          // Remove margin
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: { xs: '100%', md: '80%' }, // Responsive width
            height: '80vh',                   // Ensure box takes up 80% of the view height
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 3,
            overflow: 'hidden',               // Prevent overflow inside the box
          }}
        >
          <Box
            sx={{
              p: 4,
              backgroundColor: '#ffe6e6',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: { xs: '100%', md: '50%' }, // Responsive width for form side
              height: '100%',
            }}
          >
            <img
              src=""
              alt="Logo"
              width="100"
              height="100"
            />
            <Typography variant="h4" component="h2" sx={{ mb: 2, bgcolor:'#ffe6e6', color:'#000000' }}>
              Welcome to TravelGram !!!
            </Typography>
            <form onSubmit={handleLogin} style={{ width: '100%', backgroundColor:'#ffe6e6' }}>
              <TextField
                type="email"
                name="email"
                label="Enter your Email"
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
              <TextField
                type="password"
                name="password"
                label="Enter Password"
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox name="remember" style={{backgroundColor:'#ffe6e6'}}/>}
                label="Remember Me"
                sx={{ alignSelf: 'flex-start', color:'#000000', bgcolor:'#ffe6e6' }}
              />
              <MuiLink href="#" variant="body2" sx={{ alignSelf: 'flex-end', mb: 2, bgcolor:'#ffe6e6' }}>
                Forgot Password?
              </MuiLink>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Log In
              </Button>
              <Divider sx={{ my: 2 , bgcolor:'#ffe6e6'}}>
                <Typography  style={{color:'#000000',backgroundColor:'#ffe6e6'}}>or</Typography>
              </Divider>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
                <MuiLink
                  href="#"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: '50%',
                  }}
                >
                  <GoogleIcon />
                </MuiLink>
                <MuiLink
                  href="#"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: '50%',
                  }}
                >
                  <FacebookIcon />
                </MuiLink>
                <MuiLink
                  href="#"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: '50%',
                  }}
                >
                  <TwitterIcon />
                </MuiLink>
              </Box>
              <Typography variant="body2" style={{marginBottom:1}}>
                Don't have an account?{' '}
                <MuiLink component={RouterLink} to="/signup">
                  SignUp
                </MuiLink>
              </Typography>
            </form>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              width: '50%',
              height: '100%',  // Ensures the image takes full height of the box
            }}
          >
            <img
              src={loginImage}
              alt="A serene beach with a boat and palm trees at sunset"
              width="100%"
              height="100%"
              style={{ objectFit: 'cover' }}
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
