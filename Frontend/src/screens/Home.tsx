import {useState, useEffect} from 'react';
import {TextField, Button} from '@mui/material';
import axios from 'axios';

interface Destination {
    id: number;
    name: string;
    city: string;
}

export default function Home() {
    const [destinations, setDestinations] = useState<Destination[]>([]);

    // useEffect(() => {
    //     axios.get('/api/destinations')
    //     .then((response) => {
    //         console.log("Response::", response);
    //         setDestinations(response.data);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }, [])

    return (
        <>
        <h1>Home</h1>
        </>
    )
}