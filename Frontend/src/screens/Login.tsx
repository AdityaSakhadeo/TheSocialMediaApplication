import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
import {useNavigate } from "react-router-dom";
import TravelGram from "../assets/TravelGram.jpg";
import loginImage from "../assets/login_image.jpeg";
import googleIcon from "../assets/google-icon.png";
import facebookIcon from "../assets/facebook-icon.png";
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
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  

  // Check if user is already logged in
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

  const [credentials, setCredentials] = useState({ input: "", password: "",logintype:"" });
  const [passwordError, setPasswordError] = useState(false);


  const handleLogin = async (e: any) => {
       e.preventDefault();
       dispatch(setLoading(true));
       setPasswordError(false);
       if (credentials.input.includes('@')) {
        credentials.logintype="email";
       }
       else if (/^\d+$/.test(credentials.input)) {
        credentials.logintype="phoneNumber";
       }
       else{
        credentials.logintype="username"
       }
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
      // console.log("result", result);

      if (result.success) {
        localStorage.setItem("userInformation", JSON.stringify(result.data));
        localStorage.setItem("token", JSON.stringify(result.data.accessToken));
        navigate("/home");
      } else {
        setPasswordError(true);
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("An error occurred. Please try again.");
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const googleLoginUrl = "http://localhost:4000/api/v1/users/google-login";
      window.location.href = googleLoginUrl;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const facebookLoginUrl = "http://localhost:4000/api/v1/users/facebook-login";
      window.location.href = facebookLoginUrl;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("An error occurred. Please try again.");
    }
  };

  
  const handleChange = (e: any) => { 
  const { name, value } = e.target;
  setCredentials({ ...credentials, [name]: value });
  };



  const checkType = (value: string) => {
    if (value.includes("@")) {
      return true;
    }
    return false;
  };

  return (
    <>
    {
      isLoading && <Loader/>
    }
    <Stack width={"100vw"} height={"100vh"} direction={isSmall ? "column":"row"}>
    
    {/* Stack for Image */}
    {!isSmall && (
      <Stack width={"50%"} height={"100%"} padding={"15px"} sx={{}}>
        <img
          src={loginImage}
          style={{
            borderRadius: "10px",
            boxShadow: "0 0 20px 10px rgba(0, 0, 200, 0.1)", // Blue glow effect,
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
      flexGrow={1}
      padding={"15px"}
      paddingRight={isSmall ? "15px" : "0px"} 
      margin={isSmall ? "0px" : "15px"} // No margin on small screens
      sx={{backgroundColor:"#FFECEC"}}
    >
      {/* TravelGram Logo */}
      <img src={TravelGram} 
      style={{ borderRadius: "40%", boxShadow: "0 0 5px 0 #000000", marginBottom: "20px" ,width:"100px", height:"100px"}}
      alt="TravelGram"/>
      <Typography variant="h2" fontSize={"20px"} marginBottom={"20px"} sx={{ color:"#000000", backgroundColor:"#FFECEC"}}>
        Welcome to TravelGram !!
      </Typography>

      {/* Stack for the Email Input */}
      <Stack width={"70%"} height={"auto"} marginBottom={"20px"} >
        <TextField
          name="input"
          variant="standard"
          placeholder="Enter Email or Username or Phone Number"
          type={checkType(credentials.input) ? "email" : "username"}
          onChange={handleChange}
          fullWidth
          sx={{backgroundColor:"#FFECEC"}}
        />
      </Stack>

      {/* Stack for password */}
      <Stack width={"70%"} height={"auto"} marginBottom={"20px"}>
        <TextField
          name="password"
          variant="standard"
          placeholder="Enter password"
          type="password"
          onChange={handleChange}
          fullWidth
          sx={{backgroundColor:"#FFECEC"}}
        />
      </Stack>

      {/* Stack for the login button */}
      <Stack width={isSmall ? "80%" : "70%"} height={"auto"} marginBottom={"20px"}>
        <Button
          variant="contained"
          onClick={handleLogin}
          disableRipple
          sx={{
            backgroundColor: "#EBA51A",
            color: "#FFFFFF", // Default text color
            "&:hover": {
              backgroundColor: "#333333", // Background color on hover
            },
          }}
          disabled={!credentials.input || !credentials.password || credentials.password.length < 8 || isLoading }
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </Stack>

          {/* Step 2: Add Divider with "--or--" */}
          <Divider sx={{ width: isSmall ? "80%" : "70%", marginBottom: "20px", color:"black", backgroundColor:"#FFECEC"}}>
            <Typography variant="body2">or</Typography>
          </Divider>

            {/* Step 3: Add Google and Facebook login buttons */}
            <Stack width={isSmall ? "80%" : "70%"} spacing={2} marginBottom="20px">
            <Button
              variant="outlined"
              startIcon={<img src={googleIcon} alt="Google Icon" width={"20px"} height={"20px"}/>}
              onClick={handleGoogleLogin}
              disableRipple
              sx={{ backgroundColor: "#fff", color: "#000", borderColor: "#ccc", ":hover": { backgroundColor: "#f1f1f1" } }}
            >
              Login with Google
            </Button>

            <Button
              variant="outlined"
              startIcon={<img src={facebookIcon} alt="Facebook Icon" style={{color:"#3b5998"}} width={"20px"} height={"20px"} />}
              onClick={handleFacebookLogin}
              disableRipple
              sx={{ backgroundColor: "#fff", color: "#3b5998", borderColor: "#3b5998", ":hover": { backgroundColor: "#f1f1f1" } }}
            >
              Login with Facebook
            </Button>
            </Stack>

      {/* Stack for the signup link */}
      <Stack direction="row" alignItems="center" width={"100%"} justifyContent="center" marginTop={"2px"} sx={{backgroundColor:"#FFECEC"}}>
        <Typography fontSize={"14px"} color="#000000" marginRight={"5px"} >
          Don't have an account?
        </Typography>
        <Typography
          onClick={() => navigate("/signup")}
          sx={{
            fontSize: isSmall ? "12px" : "14px",
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
            ":hover": { color: "darkblue" }
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