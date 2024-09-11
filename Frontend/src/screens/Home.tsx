import {useState, useEffect} from 'react';
import {TextField, Button, Stack, Typography} from '@mui/material';
import axios from 'axios';

interface Destination {
    id: number;
    name: string;
    city: string;
}

export default function Home() {
    // const [destinations, setDestinations] = useState<Destination[]>([]);

    return (
        <>
        <Stack width={"100vw"} height={"100vh"} direction={"row"}>
            <Typography variant="h1">Welcome to TravelGram {localStorage.getItem("userEmail")}</Typography>
        </Stack>
        </>
    )
}