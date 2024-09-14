import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
} from "@mui/material";

import {useNavigate } from "react-router-dom";
import TravelGram from "../assets/TravelGram.jpg";
import loginImage from "../assets/login_image.jpeg";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector,useDispatch } from "react-redux";
import { setLoading } from "../redux/slices/loaderSlice";
import "../styles/Login.css";
import { RootState } from "../redux/store/store";
import Loader from '../../components/loader'

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

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
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = async (e: any) => {
    
       e.preventDefault();
       dispatch(setLoading(true));
    try {
      const response = await fetch("http://localhost:4000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      dispatch(setLoading(false));
      const result = await response.json();
      console.log(result);

      if (result.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("token", result.token);
        navigate("/home");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("An error occurred. Please try again.");
      dispatch(setLoading(false));
    }
  };

  const handleChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
    {
      isLoading && <Loader/>
    }
    <Stack width={"100vw"} height={"100vh"} direction={isSmall ? "column":"row"}>
    
    {/* Stack for Image */}
    {!isSmall && (
      <Stack width={"50%"} height={"100%"} padding={"15px"} sx={{ }}>
        <img
          src={loginImage}
          style={{
            borderRadius: "10px",
            boxShadow: "0 0 10px 0 #000000",
            objectFit: "cover",
            objectPosition: "center",
            width: "65%",
            height: "85%",
            margin: "auto",
            display: "block",
            transition: "border-color 0.3s ease",
          }}
          alt="Login"
        />
      </Stack>
    )}

    {/* Stack for implementing textinputs from the user */}
    <Stack
        width={isSmall ? "100%" : "50%"} // Full width on small screens
        height={isSmall ? "50vh" : "100vh"} // Half height on small screens
      alignItems={"center"}
      justifyContent={"center"}
      padding={"15px"}
      margin={isSmall ? "0px" : "15px"} // No margin on small screens
    >
      {/* TravelGram Logo */}
      <img src={TravelGram} width={"100px"} height={"100px"} alt="TravelGram" />
      <Typography variant="h2" fontSize={"20px"} marginBottom={"20px"}>
        Welcome to TravelGram !!
      </Typography>

      {/* Stack for the Email Input */}
      <Stack width={"70%"} height={"auto"} marginBottom={"20px"} >
        <Typography fontSize={"14px"}>Email</Typography>
        <TextField
          name="email"
          variant="standard"
          placeholder="Enter Email"
          type="email"
          onChange={handleChange}
          fullWidth
        />
      </Stack>

      {/* Stack for password */}
      <Stack width={"70%"} height={"auto"} marginBottom={"20px"}>
        <Typography fontSize={"14px"} >Password</Typography>
        <TextField
          name="password"
          variant="standard"
          placeholder="Enter password"
          type="password"
          onChange={handleChange}
          fullWidth
        />
      </Stack>

      {/* Stack for the login button */}
      <Stack width={"70%"} height={"auto"} marginBottom={"20px"}>
        <Button
          variant="contained"
          onClick={handleLogin}
          fullWidth
          disableRipple
          sx={{
            backgroundColor: "#000000", // Default background
            color: "#FFFFFF", // Default text color
            "&:hover": {
              backgroundColor: "#333333", // Background color on hover
            },
          }}
        >
          Login
        </Button>
      </Stack>

      {/* Stack for the signup link */}
      <Stack direction="row" alignItems="center" width={"100%"} justifyContent="center" marginTop={"2px"}>
        <Typography fontSize={"14px"} color="#000000" marginRight={"5px"}>
          Don't have an account?
        </Typography>
        <Typography
          onClick={() => navigate("/signup")}
          sx={{
            fontSize: "14px",
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
        >
          Sign up
        </Typography>
      </Stack>
    </Stack>
  </Stack>
  </>
  );
}