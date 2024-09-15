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
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


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
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);


  const checkType = (value: string) => {
    if (value.includes("@")) {
      return true;
    }
    return false;
  };

  const handleLogin = async (e: any) => {
    

       e.preventDefault();
       dispatch(setLoading(true));
       setPasswordError(false);


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

  if (name === 'password') {
    // Only show the error if the password does not meet the criteria and the field is not empty
    setPasswordError(!passwordRegex.test(value) && value !== "");
  }
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
    >
      {/* TravelGram Logo */}
      <img src={TravelGram} 
      style={{ borderRadius: "40%", boxShadow: "0 0 5px 0 #000000", marginBottom: "20px" ,width:"100px", height:"100px"}}
      alt="TravelGram"/>
      <Typography variant="h2" fontSize={"20px"} marginBottom={"20px"}>
        Welcome to TravelGram !!
      </Typography>

      {/* Stack for the Email Input */}
      <Stack width={"70%"} height={"auto"} marginBottom={"20px"} >
        <TextField
          name="email"
          variant="standard"
          placeholder="Enter Email or Username or Phone Number"
          type={checkType(credentials.email) ? "email" : "text"}
          onChange={handleChange}
          fullWidth
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
          error={passwordError}
          helperText={passwordError ? "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character" : ""} // Optional helper text
        />
      </Stack>

      {/* Stack for the login button */}
      <Stack width={isSmall ? "80%" : "70%"} height={"auto"} marginBottom={"20px"}>
        <Button
          variant="contained"
          onClick={handleLogin}
          disableRipple
          sx={{
            backgroundColor: "#000000", // Default background
            color: "#FFFFFF", // Default text color
            "&:hover": {
              backgroundColor: "#333333", // Background color on hover
            },
          }}
          disabled={!credentials.email || !credentials.password || credentials.password.length < 6 || loading || !passwordRegex.test(credentials.password)}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </Stack>

          {/* Step 2: Add Divider with "--or--" */}
          <Divider sx={{ width: isSmall ? "80%" : "70%", marginBottom: "20px", color:"black"}}>
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
      <Stack direction="row" alignItems="center" width={"100%"} justifyContent="center" marginTop={"2px"}>
        <Typography fontSize={"14px"} color="#000000" marginRight={"5px"}>
          Don't have an account?
        </Typography>
        <Typography
          onClick={() => navigate("/signup")}
          sx={{
            fontSize: isSmall ? "12px" : "14px",
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
            ":hover": { color: "darkblue" },
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