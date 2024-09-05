import {useState} from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Container, Box, Divider, Link, colors } from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon, Twitter as TwitterIcon } from '@mui/icons-material';
import loginImage from '../assets/login_image.jpeg'; 
import {Link as RouterLink, useNavigate}  from 'react-router-dom';


export default function Login() {
    let navigate = useNavigate()

    const [credentials , setCredentials] = useState({email: '', password: ''});


    const handleLogin = async (e:any) => {
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
    
    const handleChange = (e:any) => {
        e.preventDefault();
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',width:'100vw' }}>
        <Box sx={{ display: 'flex', backgroundColor: '#ffe6e6', borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
          <Box sx={{ p: 4, backgroundColor: '#ffe6e6', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src="" alt="Logo" width="100" height="100" />
            <Typography variant="h4" component="h2" sx={{ mb: 2 }} style={{color:'#000000'}}>
              Welcome to TravelGram !!!
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                type="email"
                name="email"
                label="Enter your Email"
                fullWidth
                margin="normal"
                value={credentials.email}
                onChange={handleChange}
              />
              <TextField
                type="password"
                name="password"
                label="Enter Password"
                fullWidth
                margin="normal"
                value={credentials.password}
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox name="remember" color="primary" />}
                label="Remember Me"
                sx={{ alignSelf: 'flex-start' }}
              />
              <Link href="#" variant="body2" sx={{ alignSelf: 'flex-end', mb: 2 }}>
                Forgot Password?
              </Link>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Log In
              </Button>
              <Divider sx={{ my: 2 }}>
                <Typography variant="body2">or</Typography>
              </Divider>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
                <Link href="#" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40, height: 40, border: 1, borderColor: 'divider', borderRadius: '50%' }}>
                  <GoogleIcon />
                </Link>
                <Link href="#" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40, height: 40, border: 1, borderColor: 'divider', borderRadius: '50%' }}>
                  <FacebookIcon />
                </Link>
                <Link href="#" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40, height: 40, border: 1, borderColor: 'divider', borderRadius: '50%' }}>
                  <TwitterIcon />
                </Link>
              </Box>
              <Typography variant="body2">
                Don't have an account? 
                <RouterLink to="/signup">SignUp</RouterLink>
              </Typography>
            </form>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' }, width: '50%' }}>
            <img src={loginImage} alt="A serene beach with a boat and palm trees at sunset" width="100%" height="auto" style={{ objectFit: 'cover', borderRadius: '0 10px 10px 0' }} />
          </Box>
        </Box>
      </Container>
    )
    
}