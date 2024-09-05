import { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Container, Box, Divider, Link as MuiLink, ThemeProvider } from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon, Twitter as TwitterIcon } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import signup_image from '../assets/login_image.jpeg';
import theme from '../theme/theme';  // Assuming you have the theme file

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
        });
        // Handle response accordingly
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container
                maxWidth={false}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: '#ffe6e6',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        boxShadow: 3,
                        overflow: 'hidden',
                        width: { xs: '100%', md: '80%' },
                        height: '80vh', // Adjusting the height
                    }}
                >
                    <Box
                        sx={{
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: { xs: '100%', md: '50%' },
                            backgroundColor: '#ffe6e6',
                        }}
                    >
                        <img
                            src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-BVbpSZmLndA7MfHIxv2ahIKS/user-IBY8IaMXtVn7IVIdZeyvjx16/img-a2CLvO9S80J7cQiLYpLYBGq0.png"
                            alt="Logo"
                            width="100"
                            height="100"
                        />
                        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
                            Welcome to WanderNest !!!
                        </Typography>
                        <form onSubmit={handleSignup} style={{ width: '100%' }}>
                            <TextField
                                type="text"
                                name="name"
                                label="Full Name"
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                            />
                            <TextField
                                type="email"
                                name="email"
                                label="Email"
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                            />
                            <TextField
                                type="password"
                                name="password"
                                label="Password"
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
                                Already have an account? <MuiLink component={RouterLink} to="/login">Log in</MuiLink>
                            </Typography>
                        </form>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            width: '50%',
                            height: '100%',  // Ensure image takes full height
                        }}
                    >
                        <img
                            src={signup_image}
                            alt="A serene beach with a boat and palm trees at sunset"
                            width="100%"
                            height="100%"
                            style={{ objectFit: 'cover', borderRadius: '0 10px 10px 0' }}
                        />
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
