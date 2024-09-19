import { Button, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from '../assets/defaultProfileImage.png';


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
console.log(userData);
  return (
    <Stack width={"100vw"} height={"100vh"} direction={"row"}>
      <Stack sx={{ position: 'absolute', top: 16, right: 16 }}>
      <Button
        onClick={() => navigate('/profile')}
        sx={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          padding: 0,
          minWidth: 0,
          border: "1px solid #000000",
          ":hover": {
          backgroundColor: "#f0f0f0",
          transition: "0.3s",
          cursor: "pointer",
          boxShadow: "0 0 10px 3px rgba(0, 0, 0, 0.2)"
            },
            ":focus": {
          boxShadow: "0 0 10px 3px rgba(0, 0, 0, 0.4)"
            }
          }}
          disableRipple
      >
        <img
          src={userData?.profileImage || defaultProfileImage}
          alt="Profile"
          style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundColor: 'white',
        objectFit: 'cover',
        objectPosition: 'center',
          }}
        />
      </Button>
      </Stack>
    </Stack>
  );
}
