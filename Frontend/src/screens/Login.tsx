import { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
  Box,
  Divider,
  Link as MuiLink,
  ThemeProvider,
  Stack,
} from "@mui/material";
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import TravelGram from "../assets/TravelGram.jpg";

export default function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = async (e: any) => {
    
    e.preventDefault();
    // console.log(credentials);
    const response = await fetch("http://localhost:4000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("token", result.token);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  return (
    <>
      <Stack width={"100vw"} height={"100vh"} direction={"row"}>
        {/* Stack for implementing textinputs from the user */}
        <Stack
          width={"50%"}
          height={"100vh"}
          alignItems={"center"}
          justifyContent={"center"}
          paddingInline={"60px"}
        >
          <img src={TravelGram} width={"100px"} height={"100px"} />
          <Typography variant="h2" fontSize={"20px"}>
            Welcome to TravelGram !!
          </Typography>
          
          {/* Stack for the Email Input */}
          <Stack width={"100%"} height={"auto"}>
            <Typography fontSize={"14px"}>Email</Typography>
            <TextField
              id="email"
              variant="standard"
              placeholder="Enter Email"
              type="email"
              onChange={handleChange}
            />
          </Stack>
          {/* stack for password */}
          <Stack width={"100%"} height={"auto"}>
            <Typography fontSize={"14px"}>Password</Typography>
            <TextField
              id="password"
              variant="standard"
              placeholder="Enter password"
              type="password"
              onChange={handleChange}
            />
          </Stack>
          {/* Stack for the login button */}
          <Stack width={"100%"} height={"auto"}>
            <Button
              variant="contained"
              onClick={handleLogin}
              fullWidth
              sx={{ backgroundColor: "#000000" }}
            >
              Login
            </Button>
            </Stack>
        </Stack>
        {/* Stack for Image */}
        <Stack width={"50%"} height={"100vh"}></Stack>
      </Stack>
    </>
  );
}