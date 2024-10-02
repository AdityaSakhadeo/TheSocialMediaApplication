import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import TravelGram from "../assets/TravelGram.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { setLoading } from '../redux/slices/loaderSlice';



export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const [credentials, setCredentials] = useState({ username: "", mobile: "", fullName: "", email: "", password: "" });
  const [mobileOrEmail, setMobileOrEmail] = useState(""); // Track the input separately
  const [errors, setErrors] = useState({ username: "", password: "" });
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home"); // Redirect to home if token exists
      dispatch(setLoading(false));
    }
    dispatch(setLoading(false));
  }, [navigate]);

  useEffect(() => {
    if (!isSmall) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to reset the overflow style when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSmall]);


  
    
    
  

  const handleSignup = async (e: any) => {
    e.preventDefault();
    dispatch(setLoading(true));

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
    const result = await response.json();
    if (!response.ok) {
      setErrors(result.errors);
      dispatch(setLoading(false));
    }

    if (result.success) {
      dispatch(setLoading(false));
      alert("User Created successfully, now you can log in");
      navigate("/");
    } else {
      if (result.statusCode==400) {
        dispatch(setLoading(false));
        alert(result.message[0])
      }
      dispatch(setLoading(false));
    }
  };

  const setSelectedFields = (input: string) => {
    const mobile = /^[0-9]+$/
    if (input.includes("@")) {
      setCredentials({ ...credentials, email: input, mobile: "" });
    } else if (mobile.test(input)) {
      setCredentials({ ...credentials, mobile: input, email: "" });
    }
    else{
      setCredentials({ ...credentials, email: input, mobile: "" });
    }
  };

  const handleChange = (e: any) => { 
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    };


  const handleMobileOrEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobileOrEmail(e.target.value);
    setSelectedFields(e.target.value);
  };


return (

  <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100vw" bgcolor="#FFECEC">
    
    <Grid2 
      container direction="column"
      alignItems="center"
      justifyContent="center"
      border="1px solid grey"
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
      borderRadius="7px"
      height="80vh"
      bgcolor="#FFEDED"
      >
        
      



      <Stack
        width={"50%"}
        height={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
        paddingInline={"60px"}
        bgcolor="#FFEDED">

        <img src={TravelGram} 
          style={{
            borderRadius: "40%",
            boxShadow: "0 0 5px 0 #000000",
            marginBottom: "20px",
            width: "100px",
            height: "100px"
          }}   
          alt="TravelGram Logo" />
        <Typography
          variant="h6"
          fontSize={"20px"}
          bgcolor="#FFEDED"
          color='orange'
          justifyContent={"center"}
        >
          Welcome to TravelGram !!
        </Typography>
        



        {/* Mobile Number or Email Address Input */}
        

        <Stack width={"100%"} height={"auto"}>
        <TextField
          name="mobileOrEmail"
          variant="standard"
          placeholder="Enter Email or Username or Phone Number"
          //type={checkType(credentials.input) ? "email" : "username"}
          onChange={handleMobileOrEmailChange}
          fullWidth
          sx={{backgroundColor:"#FFECEC"}}
        />

        </Stack>
        
        {/* Full Name Input */}
        
        <TextField
          name="fullName"
          variant="standard"
          placeholder="Enter Full Name"
          //type={checkType(credentials.input) ? "email" : "username"}
          onChange={handleChange}
          fullWidth
          sx={{backgroundColor:"#FFECEC"}}
        />
        
        {/* Username Input */}
        
          
        <TextField
          name="username"
          variant="standard"
          placeholder="Enter Username"
          //type={checkType(credentials.input) ? "email" : "username"}
          onChange={handleChange}
          fullWidth
          sx={{backgroundColor:"#FFECEC"}}
        />
       
        {/* Password Input */}
        
          
          <TextField
            name="password"
            variant="standard"
            placeholder="Enter password"
            type="password"
            onChange={handleChange}
            fullWidth
            sx={{backgroundColor:"#FFECEC"}}
          />
        
        {/* Stack for the login button */}
      <Stack width={isSmall ? "80%" : "70%"} height={"auto"} marginBottom={"20px"}>
        <Button
          variant="contained"
          onClick={handleSignup}
          disableRipple
          sx={{
            backgroundColor: "#EBA51A",
            color: "#FFFFFF", // Default text color
            "&:hover": {
              backgroundColor: "#333333", // Background color on hover
            },
          }}
          disabled={!credentials.username || !credentials.password || credentials.password.length < 8 || isLoading }
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
        </Button>
      </Stack>
      </Stack>
    </Grid2>
  </Box>
);
}
