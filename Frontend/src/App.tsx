import { useEffect, useState } from "react";
import "./App.css";
import axios from 'axios';
function App() {
  const [destinations, setDestinations] = useState([]);

  
  useEffect(()=>{
    axios.get('http://localhost:4000/destinations')
    .then((response)=>{
      setDestinations(response.data);
    }
    )
    .catch((error)=>{
      console.log(error);
      })
  },[])


  return (
    <>
      <h1>Currently Available Destinations Are</h1>
      {destinations.map((destination, index) => {
        <div key={index}>{destination}</div>;
      })}
    </>
  );
}

export default App;
