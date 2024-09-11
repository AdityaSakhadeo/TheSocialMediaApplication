import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
} from "@mui/material";

import {useNavigate } from "react-router-dom";
import TravelGram from "../assets/TravelGram.jpg";
import loginImage from "../assets/login_image.jpeg";

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
        "Allow-Control-Allow-Origin": "*",
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
      // localStorage.setItem("token", result.token);
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Stack width={"100vw"} height={"100vh"} direction={"row"} >
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
              name="email"
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
              name="password"
              variant="standard"
              placeholder="Enter password"
              type="password"
              onChange={handleChange}
              sx={{ marginBottom: "20px" }}
            />
          </Stack>
          {/* Stack for the login button */}
          <Stack width={"100%"} height={"auto"}>
            <Button
              variant="contained"
              onClick={handleLogin}
              fullWidth
              disableRipple
              sx={{
                backgroundColor: "#000000",  // Default background
                color: "#FFFFFF",            // Default text color
                "&:hover": {
                  backgroundColor: "#333333", // Background color on hover
                }
              }}
            >
              Login
            </Button>
            </Stack>
            <Stack width={"100%"} height={"auto"}>
            <Typography fontSize={"14px"} color="#000000">Don't have an account?</Typography>
            <Button
              variant="contained"
              disableRipple
              onClick={() => navigate("/signup")}
              sx={{   backgroundColor: "#000000",  // Default background
                color: "#FFFFFF",            // Default text color
                "&:hover": {
                  backgroundColor: "#333333", // Background color on hover
                }, fontSize: "12px", width:"50%"}}
            >Sign up</Button>
            </Stack>
        </Stack>

        {/* Stack for Image */}
        <Stack width={"50%"} height={"100vh"}>
          <img src={loginImage} width={"100%"} height={"100%"} />
        </Stack>
      </Stack>
    </>
  );
}