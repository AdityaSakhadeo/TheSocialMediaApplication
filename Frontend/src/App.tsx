import { useEffect, useState } from "react";
import "./App.css";
import axios from 'axios';
function App() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  interface Destination{
    id:number,
    name: string,
    city:string;
  }
  useEffect(() => {
    axios.get('/jokes')
      .then((response:any) => {
        console.log("Response::",response)
        setDestinations(response.data);
      }).catch((err:any) => {
        console.log(err);
      });
  },[])


  return (
    <>
      <h1>There are {destinations.length} destinations available</h1>
      {destinations.map((destination:Destination, index:number) => (
          <div key={destination.id}>
            <h2>{destination.name}</h2>
            <p>City: {destination.city}</p>
          </div>

      ))}
    </>
  );
}

export default App;
