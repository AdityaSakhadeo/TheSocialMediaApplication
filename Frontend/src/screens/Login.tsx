import { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Container, Box, Divider, Link as MuiLink, ThemeProvider } from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon, Twitter as TwitterIcon } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import loginImage from '../assets/login_image.jpeg';
import theme from './theme/theme';


export default function Login() {
    let navigate = useNavigate()

    const [credentials , setCredentials] = useState({email: '', password: ''});


    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const result = await response.json();
        console.log(result);
        if(result.success){
            localStorage.setItem('userEmail', credentials.email);
            localStorage.setItem('token', result.token);
            navigate('/');
        }else{
            alert('Invalid credentials');
        }
    }
    
    const handleChange = (e) => {
        e.preventDefault();
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
      <ThemeProvider theme={theme}>

      <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
      <Box sx={{ display: 'flex', backgroundColor: '#ffe6e6', borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
        <Box sx={{ p: 4, backgroundColor: '#ffe6e6', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-BVbpSZmLndA7MfHIxv2ahIKS/user-IBY8IaMXtVn7IVIdZeyvjx16/img-a2CLvO9S80J7cQiLYpLYBGq0.png?st=2024-09-04T08%3A23%3A31Z&amp;se=2024-09-04T10%3A23%3A31Z&amp;sp=r&amp;sv=2024-08-04&amp;sr=b&amp;rscd=inline&amp;rsct=image/png&amp;skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&amp;sktid=a48cca56-e6da-484e-a814-9c849652bcb3&amp;skt=2024-09-03T23%3A52%3A50Z&amp;ske=2024-09-04T23%3A52%3A50Z&amp;sks=b&amp;skv=2024-08-04&amp;sig=g9lGsE/IBLGH5qV1NE9uCv/S5Ve2lR%2BXTJuIisighso%3D" alt="Logo" width="100" height="100" />
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
            Welcome to WanderNest !!!
          </Typography>
          <form onSubmit={handleLogin}>
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
              control={<Checkbox name="remember" color="primary" />}
              label="Remember Me"
              sx={{ alignSelf: 'flex-start' }}
            />
            <MuiLink href="#" variant="body2" sx={{ alignSelf: 'flex-end', mb: 2 }}>
              Forgot Password?
            </MuiLink>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Log In
            </Button>
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2">or</Typography>
            </Divider>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
              <MuiLink href="#" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40, height: 40, border: 1, borderColor: 'divider', borderRadius: '50%' }}>
                <GoogleIcon />
              </MuiLink>
              <MuiLink href="#" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40, height: 40, border: 1, borderColor: 'divider', borderRadius: '50%' }}>
                <FacebookIcon />
              </MuiLink>
              <MuiLink href="#" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40, height: 40, border: 1, borderColor: 'divider', borderRadius: '50%' }}>
                <TwitterIcon />
              </MuiLink>
            </Box>
            <Typography variant="body2">
              Don't have an account? 
              <MuiLink component={RouterLink} to="/signup">SignUp</MuiLink>
            </Typography>
          </form>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' }, width: '50%' }}>
          <img src={loginImage} alt="A serene beach with a boat and palm trees at sunset" width="100%" height="auto" style={{ objectFit: 'cover', borderRadius: '0 10px 10px 0' }} />
        </Box>
      </Box>
    </Container>
    
    </ThemeProvider>
    )
    
}