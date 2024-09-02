import { useEffect, useState } from "react";
import "./App.css";
import axios from 'axios';
function App() {
  const [destinations, setDestinations] = useState([]);

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
      <h1>Hello World</h1>
      <h1>There are {destinations.length} destinations available</h1>
    </>
  );
}

export default App;
