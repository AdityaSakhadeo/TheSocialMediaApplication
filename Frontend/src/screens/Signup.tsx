import { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Container, Box, Divider, Link, Grid, colors } from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon, Twitter as TwitterIcon } from '@mui/icons-material';
import signup_image from '../assets/login_image.jpeg';

export default function Signup() {
    const [credentials , setCredentials] = useState({name: '', email: '', password: ''});

    const handleSignup = async (e:any) => {
        e.preventDefault();
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
        });
    }
    
    const handleChange = (e:any) => {
        e.preventDefault();
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <Container maxWidth="xl" sx={{ display: 'flex',justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box sx={{ display: 'flex', backgroundColor: '#ffe6e6', borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
          <Box sx={{ p: 4, backgroundColor: '#ffe6e6', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-BVbpSZmLndA7MfHIxv2ahIKS/user-IBY8IaMXtVn7IVIdZeyvjx16/img-a2CLvO9S80J7cQiLYpLYBGq0.png?st=2024-09-04T08%3A23%3A31Z&amp;se=2024-09-04T10%3A23%3A31Z&amp;sp=r&amp;sv=2024-08-04&amp;sr=b&amp;rscd=inline&amp;rsct=image/png&amp;skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&amp;sktid=a48cca56-e6da-484e-a814-9c849652bcb3&amp;skt=2024-09-03T23%3A52%3A50Z&amp;ske=2024-09-04T23%3A52%3A50Z&amp;sks=b&amp;skv=2024-08-04&amp;sig=g9lGsE/IBLGH5qV1NE9uCv/S5Ve2lR%2BXTJuIisighso%3D" alt="Logo" width="100" height="100" />
            <Typography variant="h4" component="h2" sx={{ mb: 2 }} style={{color:'#000000'}}>
              Welcome to WanderNest !!!
            </Typography>


	<Typography >
	
	Full Name
	</Typography>    
	
            <form onSubmit={handleSignup}>
              <TextField
                type="text"
                name="name"
                label="Enter your Full Name"
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
	<Typography>
		Email
	</Typography>
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
                control={<Checkbox name="terms" color="primary" />}
                label="I agree with terms & Conditions"
                sx={{ alignSelf: 'flex-start' }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Sign Up
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
                Already have an account? <Link href="#">Log in</Link>
              </Typography>
            </form>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' }, width: '50%' }}>
            <img src={signup_image} alt="A serene beach with a boat and palm trees at sunset" width="75%" height="auto" style={{ objectFit: 'cover', borderRadius: '0 10px 10px 0' }} />
          </Box>
        </Box>
      </Container>
    )
}


