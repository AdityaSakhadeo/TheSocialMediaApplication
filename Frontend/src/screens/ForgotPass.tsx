import { useState } from "react";
import {
	TextField,
	Button,
	Typography,
	Stack,
	Box,
	Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TravelGram from "../assets/TravelGram.jpg";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../redux/slices/loaderSlice";
import "../styles/Login.css";
import { RootState } from "../redux/store/store";
import axios, { AxiosError } from "axios";
import Loader from "../components/loader";


export default function ForgotPass() {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLoading = useSelector((state: RootState) => state.loader.isLoading);
	const [email, setEmail] = useState("");

	const handleChange = (e: any) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (): Promise<void> => {
		if (!email.includes("@")) {
			alert("Email is invalid")
			return;
		}

		try {
			dispatch(setLoading(true));

			const response = await axios.post<{ message: string }>(
				"http://localhost:4000/api/v1/users/forgot-password",
				{ email: email },
				{ withCredentials: true }
			);
			dispatch(setLoading(false));
			alert(response.data.message);
			navigate("/");
		} catch (error) {
			const err = error as AxiosError<{ message: string }>;
			alert(err.response?.data?.message || "Something went wrong.");
			console.error("Forgot password error:", err);
		} finally {
			dispatch(setLoading(false));
		}
	};


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
						sx={{ backgroundColor: "#FFEDED" }}
					/>

					{/* Stack for the signin button */}

					<Button
						variant="contained"
						fullWidth
						//onClick={}
						disableRipple
						onClick={handleSubmit}
						sx={{
							backgroundColor: "#EBA51A",
							color: "#FFFFFF", // Default text color
							"&:hover": {
								backgroundColor: "#333333", // Background color on hover
							},
						}}

					>
						Forgot Password

					</Button>

					<Stack
						direction="row"
						alignItems="center"
						width={"fit-content"}
						justifyContent="center"
						marginTop={"2px"}
						sx={{ backgroundColor: "#FFECEC" }}
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
							Back to
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
	</>
	);
}