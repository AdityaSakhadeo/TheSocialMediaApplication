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
        <h1>There are {destinations.length} destinations available</h1>
        {
            destinations.map((destination) => (
                <div key={destination.id}>
                    <h2>{destination.name}</h2>
                    <p>City: {destination.city}</p>
                </div>
            ))
        }
        </>
    )
}