import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userInformation") || '{}');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
      console.log("successfully logged in");

  }, [navigate]);

  return (
    <Stack width={"100vw"} height={"100vh"} direction={"row"}>
      <Typography variant="h1" sx={{ color: "black" }}>
        Welcome to TravelGram {userData?.user?.username}
      </Typography>
    </Stack>
  );
}
