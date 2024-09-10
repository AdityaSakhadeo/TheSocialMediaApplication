import {useState, useEffect} from 'react';
import {TextField, Button, Stack, Typography} from '@mui/material';
import axios from 'axios';

interface Destination {
    id: number;
    name: string;
    city: string;
}

export default function Home() {
    const [destinations, setDestinations] = useState<Destination[]>([]);

    return (
        <>
        <Stack direction="row" width={"100vw"} height={"100vh"} >
            <Typography variant="h4">Welcome to TravelGram {localStorage.getItem("userEmail")}</Typography>
        </Stack>
        </>
    )
}