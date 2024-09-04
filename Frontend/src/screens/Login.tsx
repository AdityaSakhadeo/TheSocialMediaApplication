import {useState} from 'react';
import {TextField, Button} from '@mui/material';



export default function Login() {
    
    const [credentials , setCredentials] = useState({email: '', password: ''});


    const handleLogin = (e) => {
        e.preventDefault();
        console.log(credentials);
    }
    const handleChange = (e) => {
        e.preventDefault();
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <>
        <div style={{backgroundColor: '#FFECEC'}}>
            <h2>Welcome to TravelGram !</h2>

            <form onSubmit={handleLogin}>
                <TextField type="email" name="email" label="Enter your Email" onChange={handleChange} />
                <br />
                <TextField type="password" name="password" label="Enter Password" onChange={handleChange} />
                <br />
                <Button variant="contained">LogIn</Button>
            </form>
        </div>
        </>
    )
    
}