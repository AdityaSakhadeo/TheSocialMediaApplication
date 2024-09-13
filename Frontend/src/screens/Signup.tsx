import React, { useState } from 'react';
import { Link as MuiLink, ThemeProvider, Stack, TextField,Button, Typography} from "@mui/material";
import { Google as GoogleIcon, Facebook as FacebookIcon, Twitter as TwitterIcon } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import TravelGram from "../assets/TravelGram.jpg";


export default function Signup() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({username: "", mobile: "", fullName: "", email: "", password: "" });
  const mobileOrEmail = ""
  const handleSignup = async (e: any) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/v1/users/register", {
        method: "POST",
        headers: {

            "Content-Type": "application/json",
            "Allow-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({

          username: credentials.username,
          email: credentials.email,
          phoneNumber: credentials.mobile,
            fullName: credentials.fullName,
            password: credentials.password,
        }),
        });

        console.log(response);

        const result = await response.json();
        console.log(result);
        if (result.success) {
            localStorage.setItem
            ("userEmail", credentials.email);
            //localStorage.setItem("token", result.token);
            navigate("/home");
        }
        else {
            alert("Invalid credentials");
        }
    
    
    };

    // Handle the response here...

  const setSelectedFields = (mobileOrEmail: string) => {
    if (mobileOrEmail.includes("@")) {
      setCredentials({ ...credentials, email: mobileOrEmail, mobile: "" });
    } else if (mobileOrEmail.length === 10 && !mobileOrEmail.includes("@")) {
      setCredentials({ ...credentials, mobile: mobileOrEmail, email: "" });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      
      {/* Stack for the Mobile Number or Email Address Input */}
      <Stack width={"100%"} height={"auto"}>
        <Typography fontSize={"14px"}>Mobile Number or Email address</Typography>
        <TextField
          id="mobileOrEmail"
          variant="standard"
          placeholder="Enter Mobile Number or Email address"
          onChange={()=>setSelectedFields(mobileOrEmail)}
        />
      </Stack>

      {/* Stack for the Full Name Input */}
      <Stack width={"100%"} height={"auto"}>
        <Typography fontSize={"14px"}>Full Name</Typography>
        <TextField
          id="fullName"
          variant="standard"
          placeholder="Enter Full Name"
          onChange={handleChange}
        />
      </Stack>

      {/* Stack for the Email Input */}
      <Stack width={"100%"} height={"auto"}>
        <Typography fontSize={"14px"}>Username</Typography>
        <TextField
          id="username"
          variant="standard"
          placeholder="Enter Username"
          onChange={handleChange}
        />
      </Stack>

      {/* Stack for password */}
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

      {/* Stack for the signup button */}
      <Stack width={"100%"} height={"auto"}>
        <Button
          variant="contained"
          onClick={handleSignup}
          fullWidth
          sx={{ backgroundColor: "#000000" }}
        >
          Signup
        </Button>
      </Stack>
    </Stack>

    {/* Stack for Image */}
    <Stack width={"50%"} height={"100vh"}></Stack>
  </Stack>
</>
  );
}






