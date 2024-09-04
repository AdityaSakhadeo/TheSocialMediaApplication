import {React, useState} from 'react';
import {TextField, Button} from '@mui/material';

export default function Signup() {
    return (
        <>
        <div style={{backgroundColor: '#FFECEC'}}>
            <h2>Welcome to TravelGram !</h2>
            <form>
                <TextField type="text" name="name" label="Enter your Name" />
                <TextField type="email" name="email" label="Enter your Email" />
                <TextField type="password" name="password" label="Enter Password" />
                <Button variant="contained">SignUp</Button>
            </form>
        </div>
        </>
    )
}