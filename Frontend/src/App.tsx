import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./screens/Login";
import axios from 'axios';
import "./App.css";

interface Destination {
  id: number;
  name: string;
  city: string;
}

function App() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    axios.get('/api/destinations')
      .then((response) => {
        console.log("Response::", response);
        setDestinations(response.data);
      }).catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <>
      {/* <h1>There are {destinations.length} destinations available</h1>
      {
        destinations.map((destination) => (
          <div key={destination.id}>
            <h2>{destination.name}</h2>
            <p>City: {destination.city}</p>
          </div>
        ))
      } */}
      <Router>
        <Routes>
        <Route path="/login" element={<Login />} />
        </Routes>
        </Router>
    </>
  );
}

export default App;