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
import { useLocation, useNavigate } from "react-router-dom";
import TravelGram from "../assets/TravelGram.jpg";
import loginImage from "../assets/login_image.jpeg";
import googleIcon from "../assets/google-icon.png";
import facebookIcon from "../assets/facebook-icon.png";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../redux/slices/loaderSlice";
import "../styles/Login.css";
import { RootState } from "../redux/store/store";



export default function ResetPass() {
	const [passwordCheck, setPasswordCheck] = useState({ oldpassword: "", newpassword: "", confirmed: "" })
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);

	const isFromReset = queryParams.get("isFromReset") === "true";
	const resetToken = queryParams.get("token");

	const handleChange = (e: any) => {
		console.log("Setting---", e.target.name)
		const { name, value } = e.target;
		setPasswordCheck({ ...passwordCheck, [name]: value })
	};

	const onResetPassword = async () => {
		if (isFromReset) {
			if (!passwordCheck.oldpassword) {
				alert("old password is mandatory")
			}
			if (!(passwordCheck.newpassword === passwordCheck.confirmed)) {
				alert("New and confirmed passwords do not match")
				setPasswordCheck(prev => ({
					...prev,
					newpassword: "",
					confirmed: ""
				}))
			}
		}
	}

	return (
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

					{isFromReset && <>
						<Typography
							variant="h6"
							fontSize={"15px"}
							bgcolor="#FFEDED"
							color='textSecondary'
							component='h2'
							align='center'
						>
							Enter old password
						</Typography>

						<TextField
							name="oldpassword"
							variant="standard"
							value={passwordCheck.oldpassword}
							type="password"
							placeholder="Enter New Password"
							size='small'
							color="primary"
							//type={checkType(credentials.input) ? "email" : "username"}
							onChange={handleChange}
							fullWidth
							sx={{ backgroundColor: "#FFEDED" }}
						/></>
					}

					<Typography
						variant="h6"
						fontSize={"15px"}
						bgcolor="#FFEDED"
						color='textSecondary'
						component='h2'
						align='center'
					>
						Enter New Password
					</Typography>

					<TextField
						name="newpassword"
						variant="standard"
						value={passwordCheck.newpassword}
						type="password"
						placeholder="Enter New Password"
						size='small'
						color="primary"
						//type={checkType(credentials.input) ? "email" : "username"}
						onChange={handleChange}
						fullWidth
						sx={{ backgroundColor: "#FFEDED" }}
					/>


					<Typography
						variant="h6"
						fontSize={"15px"}
						bgcolor="#FFEDED"
						color='textSecondary'
						component='h2'
						align='center'
					>
						Confirm New Password
					</Typography>

					{/* confirem password */}
					<TextField
						name="confirmed"
						variant="standard"
						value={passwordCheck.confirmed}
						type="password"
						placeholder="Confirm Password"
						size='small'
						color="primary"
						//type={checkType(credentials.input) ? "email" : "username"}
						onChange={handleChange}
						fullWidth
						sx={{ backgroundColor: "#FFEDED" }}
					/>

					{/* Stack for the signin button */}

					<Button
						variant="contained"
						fullWidth
						onClick={onResetPassword}
						disableRipple
						sx={{
							backgroundColor: "#EBA51A",
							color: "#FFFFFF", // Default text color
							"&:hover": {
								backgroundColor: "#333333", // Background color on hover
							},
						}}

					>
						Reset Password

					</Button>



				</Stack>
			</Stack>
		</Box>
	);
}