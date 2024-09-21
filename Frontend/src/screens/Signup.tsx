import React, { useState } from 'react';
import { Link as MuiLink, ThemeProvider, Stack, TextField,Button, Typography, Box, Grid, Grid2, CircularProgress, Link} from "@mui/material";
import { Google as GoogleIcon, Facebook as FacebookIcon, Twitter as TwitterIcon } from "@mui/icons-material";
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
  const [errors, setErrors] = useState({username: "", password: ""});


  const isValidUsername = (username: string) => {
    if (username.trim() === "") {
      setErrors(prevErrors => ({ ...prevErrors, username: "Username is required"}));
      return false;
    }
    return true;
  };


  const isValidPassword = (password: string) => {
    //password should be at least 8 characters long
    if (password.length < 8) {
      setErrors(prevErrors => ({ ...prevErrors, password: "Password should be at least 8 characters long"}));
      return false;
    }
    return true;
  }
    
    
  

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

    if (!response.ok) {
      const data = await response.json();
      setErrors(data.errors);
    }

    const result = await response.json();
    console.log(result);

    if (result.success) {
      dispatch(setLoading(false));
      alert("User Created successfully, now you can log in---->")
      navigate("/login");
    } else {
      if (result.statusCode==400) {
        dispatch(setLoading(false));
        alert(result.message[0])
      }
      dispatch(setLoading(false));
    }
  };

  // Updated setSelectedFields to handle input properly
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

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCredentials({ ...credentials, [e.target.name]: e.target.value });
  // };

  const handleMobileOrEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobileOrEmail(e.target.value);
    setSelectedFields(e.target.value); // Pass the correct value here
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
            id='mobileOrEmail'
            variant="outlined"
            label="Mobile Number or Email address"
            

            placeholder="Enter Mobile Number or Email address"
            //color of textfield box #e5d4d4
            sx={{
              color: "black", // Change this to the desired text color
            }}

            onChange={handleMobileOrEmailChange} // Updated here
            value={mobileOrEmail}
          />

          </Stack>
        
        {/* Full Name Input */}
        
          
          <TextField
            name="fullName"
            id='fullName'
            variant="outlined"
            placeholder="Enter Full Name"
            label="Full Name"
            onChange={handleChange}
          />
        
        {/* Username Input */}
        <Stack width={"100%"} height={"auto"}></Stack>
          
          <TextField
            name="username"
            variant="outlined"
            placeholder="Enter Username"
            label="Username"
            onChange={handleChange}
          />
       
        {/* Password Input */}
        
          
          <TextField
            name="password"
            id='outlined-password-input'
            label="Password"
            // variant="standard"
            placeholder="Enter password"
            type="password"
            onChange={handleChange}
          />
        
        {/* Signup Button */}
        <Stack width={"100%"} height={"auto"}>
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
            disabled={!credentials.username || !credentials.password || credentials.password.length < 8 || isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Stack>
      </Stack>
    </Grid2>
  </Box>
);


}

//   return (
//     <>
    //   <Stack width={"100vw"} height={"100vh"} direction={"row"}>
        // <Stack width={"50%"} height={"100vh"} alignItems={"center"} justifyContent={"center"} paddingInline={"60px"}>
        //   <img src={TravelGram} width={"100px"} height={"100px"} alt="TravelGram Logo" />
        //   <Typography variant="h2" fontSize={"20px"}>
        //     Welcome to TravelGram !!
        //   </Typography>

        //   {/* Mobile Number or Email Address Input */}
        //   <Stack width={"100%"} height={"auto"}>
        //     <Typography fontSize={"14px"}>Mobile Number or Email address</Typography>
        //     <TextField
        //       name="mobileOrEmail"
        //       variant="standard"
        //       placeholder="Enter Mobile Number or Email address"
        //       onChange={handleMobileOrEmailChange} // Updated here
        //       value={mobileOrEmail}
        //     />
        //   </Stack>

        //   {/* Full Name Input */}
        //   <Stack width={"100%"} height={"auto"}>
        //     <Typography fontSize={"14px"}>Full Name</Typography>
        //     <TextField
        //       name="fullName"
        //       variant="standard"
        //       placeholder="Enter Full Name"
        //       onChange={handleChange}
        //     />
        //   </Stack>

        //   {/* Username Input */}
        //   <Stack width={"100%"} height={"auto"}>
        //     <Typography fontSize={"14px"}>Username</Typography>
        //     <TextField
        //      name="username"
        //       variant="standard"
        //       placeholder="Enter Username"
        //       onChange={handleChange}
        //     />
        //   </Stack>

        //   {/* Password Input */}
        //   <Stack width={"100%"} height={"auto"}>
        //     <Typography fontSize={"14px"}>Password</Typography>
        //     <TextField
        //       name="password"
        //       variant="standard"
        //       placeholder="Enter password"
        //       type="password"
        //       onChange={handleChange}
        //     />
        //   </Stack>

        //   {/* Signup Button */}
        //   <Stack width={"100%"} height={"auto"}>
        //     <Button variant="contained" onClick={handleSignup} fullWidth sx={{ backgroundColor: "#000000" }}>
        //       Signup
        //     </Button>
        //   </Stack>
    //     </Stack>

    //     <Stack width={"50%"} height={"100vh"}></Stack>
    //   </Stack>
//     </>
//   );
// }


// export default function Signup() {
//   const navigate = useNavigate();

//   const [credentials, setCredentials] = useState({username: "", mobile: "", fullName: "", email: "", password: "" });
//   const mobileOrEmail = ""
//   const handleSignup = async (e: any) => {
//     e.preventDefault();

//     const response = await fetch("http://localhost:4000/api/v1/users/register", {
//         method: "POST",
//         headers: {

//             "Content-Type": "application/json",
//             "Allow-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify({

//           username: credentials.username,
//           email: credentials.email,
//           phoneNumber: credentials.mobile,
//             fullName: credentials.fullName,
//             password: credentials.password,
//         }),
//         });

//         console.log(response);

//         const result = await response.json();
//         console.log(result);
//         if (result.success) {
//             localStorage.setItem
//             ("userEmail", credentials.email);
//             //localStorage.setItem("token", result.token);
//             navigate("/home");
//         }
//         else {
//             alert("Invalid credentials");
//         }
    
    
//     };

//     // Handle the response here...

//   const setSelectedFields = (mobileOrEmail: string) => {
//     if (mobileOrEmail.includes("@")) {
//       setCredentials({ ...credentials, email: mobileOrEmail, mobile: "" });
//     } else if (mobileOrEmail.length === 10 && !mobileOrEmail.includes("@")) {
//       setCredentials({ ...credentials, mobile: mobileOrEmail, email: "" });
//     }
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCredentials({ ...credentials, [e.target.id]: e.target.value });
//   };

//   return (
//     <>
//   <Stack width={"100vw"} height={"100vh"} direction={"row"}>
//     {/* Stack for implementing textinputs from the user */}
//     <Stack
//       width={"50%"}
//       height={"100vh"}
//       alignItems={"center"}
//       justifyContent={"center"}
//       paddingInline={"60px"}
//     >
//       <img src={TravelGram} width={"100px"} height={"100px"} />
//       <Typography variant="h2" fontSize={"20px"}>
//         Welcome to TravelGram !!
//       </Typography>
      
//       {/* Stack for the Mobile Number or Email Address Input */}
//       <Stack width={"100%"} height={"auto"}>
//         <Typography fontSize={"14px"}>Mobile Number or Email address</Typography>
//         <TextField
//           id="mobileOrEmail"
//           variant="standard"
//           placeholder="Enter Mobile Number or Email address"
//           onChange={()=>setSelectedFields(mobileOrEmail)}
//         />
//       </Stack>

//       {/* Stack for the Full Name Input */}
//       <Stack width={"100%"} height={"auto"}>
//         <Typography fontSize={"14px"}>Full Name</Typography>
//         <TextField
//           id="fullName"
//           variant="standard"
//           placeholder="Enter Full Name"
//           onChange={handleChange}
//         />
//       </Stack>

//       {/* Stack for the Email Input */}
//       <Stack width={"100%"} height={"auto"}>
//         <Typography fontSize={"14px"}>Username</Typography>
//         <TextField
//           id="username"
//           variant="standard"
//           placeholder="Enter Username"
//           onChange={handleChange}
//         />
//       </Stack>

//       {/* Stack for password */}
//       <Stack width={"100%"} height={"auto"}>
//         <Typography fontSize={"14px"}>Password</Typography>
//         <TextField
//           id="password"
//           variant="standard"
//           placeholder="Enter password"
//           type="password"
//           onChange={handleChange}
//         />
//       </Stack>

//       {/* Stack for the signup button */}
//       <Stack width={"100%"} height={"auto"}>
//         <Button
//           variant="contained"
//           onClick={handleSignup}
//           fullWidth
//           sx={{ backgroundColor: "#000000" }}
//         >
//           Signup
//         </Button>
//       </Stack>
//     </Stack>

//     {/* Stack for Image */}
//     <Stack width={"50%"} height={"100vh"}></Stack>
//   </Stack>
// </>
//   );
// }






