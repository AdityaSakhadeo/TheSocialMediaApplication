import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Divider,
  CircularProgress,
  Box,
  Link,
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


export default function ForgotPass() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  const [Email, setEmail] = useState("");

  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };



return(
	<Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100vw" bgcolor="#FFECEC">
    
	<Stack
	  direction="column"
	  alignItems="center"
	  justifyContent="center"
	  border="1px solid grey"
	  boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
	  borderRadius="0px"
	  height="95vh"
	  width="30%"
	  bgcolor="#FFEDED"
	  >
    
	  <Stack 
	    direction="column"
	    spacing={2.5}
	    width={"60%"}
	    height={"100vh"}
	    alignItems={"center"}
	    justifyContent={"center"}
	    paddingInline={"60px"}
	    bgcolor="#FFEDED"
	    >
     
	    
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
	      fontSize={"15px"}
	      bgcolor="#FFEDED"
	      color='textSecondary'
	      component='h2'
	      align='center'
	    >
	      Enter your email address and we'll send you a link to get back into your account.
	    </Typography>

	    {/* Username Input */}
	    
	      
	    <TextField
	      name="Email"
	      variant="standard"
	      placeholder="Enter Email"
	      size='small'
	      color="primary"
	      //type={checkType(credentials.input) ? "email" : "username"}
	      onChange={handleChange}
	      fullWidth
	      sx={{backgroundColor:"#FFEDED"}}
	    />
	    
	    {/* Stack for the signin button */}
	 
	    <Button
	      variant="contained"
	      fullWidth
	      //onClick={}
	      disableRipple
	      sx={{
		backgroundColor: "#EBA51A",
		color: "#FFFFFF", // Default text color
		"&:hover": {
		  backgroundColor: "#333333", // Background color on hover
		},
	      }}
	
	     >
		Send Login Link
	      
	    </Button>

	    <Stack 
	      direction="row" 
	      alignItems="center" 
	      width={"fit-content"} 
	      justifyContent="center" 
	      marginTop={"2px"} 
	      sx={{backgroundColor:"#FFECEC"}}
	    >
	    <Typography 
	      variant="caption"
	      align="center"
	      fontSize={"75%"}
	      width={"fit-content"}
	      bgcolor="#FFEDED"
	      color='textSecondary'
	      component='h2'
	    >
	      Back to ,  
	      <Link 
	      variant="caption"
	      align="center"
	      fontSize={"100%"}
	      href='/'
	      bgcolor={"#FFEDED"}
	      > Log in
	      </Link>
	    </Typography>
	  </Stack>
	  
	  </Stack>
	</Stack>
      </Box>	
);
}