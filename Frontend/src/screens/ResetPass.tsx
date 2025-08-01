import { useEffect, useState } from "react";
import {
	TextField,
	Button,
	Typography,
	Stack,
	Box,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import TravelGram from "../assets/TravelGram.jpg";
import "../styles/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/slices/loaderSlice";
import axios from "axios";
import Loader from "../components/loader";
import { RootState } from "../redux/store/store";
import { showAlert } from "../redux/slices/alertSlice";


export default function ResetPass() {
	const [passwordCheck, setPasswordCheck] = useState({ oldpassword: "", newpassword: "", confirmed: "" })
	const location = useLocation();
	const navigate = useNavigate();
	const isLoading = useSelector((state: RootState) => state.loader.isLoading);
	const queryParams = new URLSearchParams(location.search);
	const dispatch = useDispatch();
	const isFromResetPage = queryParams.get("isFromReset") === "true";
	const resetToken = queryParams.get("token");

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setPasswordCheck({ ...passwordCheck, [name]: value })
	};


	const onResetPassword = async () => {
		if (isFromResetPage) {
			if (!passwordCheck.oldpassword) {
				// alert("old password is mandatory")
				dispatch(showAlert({ type: "warning", message: 'Old password is mandatory' }));
			}
			if (!(passwordCheck.newpassword === passwordCheck.confirmed)) {
				// alert("New and confirmed passwords do not match")
				dispatch(showAlert({ type: "warning", message: 'New and confirmed passwords do not match' }));
				setPasswordCheck(prev => ({
					...prev,
					newpassword: "",
					confirmed: ""
				}))
			}

			try {
				dispatch(setLoading(true));
				const userInfo = JSON.parse(localStorage.getItem("userInformation") || '{}')
				const response = await axios.post<{ message: string }>(
					"http://localhost:4000/api/v1/users/reset-password",
					{
						type: "reset",
						userId: userInfo?.user?._id,
						oldpassword: passwordCheck.oldpassword,
						newPassword: passwordCheck.newpassword
					},
					{ withCredentials: true }
				);
				dispatch(setLoading(false))
				navigate("/");
				console.log("Response::::::", JSON.stringify(response))
			} catch (error) {
				dispatch(setLoading(false))
				console.log("Error while Resetting the password------------>", error);
			}
		}
		else {
			if (!(passwordCheck.newpassword === passwordCheck.confirmed)) {
				// alert("New and confirmed passwords do not match")
				dispatch(showAlert({ type: "warning", message: 'New and confirmed passwords do not match' }));
				setPasswordCheck(prev => ({
					...prev,
					newpassword: "",
					confirmed: ""
				}))
			}
			console.log("Payload being sent:", {
				type: "forgot",
				token: resetToken,
				newPassword: passwordCheck.newpassword
			});
			try {
				dispatch(setLoading(true));

				const response = await axios.post<{ message: string }>(
					"http://localhost:4000/api/v1/users/reset-password",
					{
						type: "forgot",
						token: resetToken ? resetToken : "",
						newPassword: passwordCheck.newpassword
					},
					{ withCredentials: true }
				);
				dispatch(setLoading(false))
				// navigate("/");
				console.log("Response::::::", JSON.stringify(response))
			} catch (error) {
				dispatch(setLoading(false))
				console.log("Error while Resetting the password------------>", error);
			}
		}
	}

	return (<>
		{isLoading && <Loader />}
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

					{isFromResetPage && <>
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
							placeholder="Enter Old Password"
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
	</>
	);
}