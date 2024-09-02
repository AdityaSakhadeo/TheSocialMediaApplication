import { useState } from "react";
import "./App.css";

function App() {
  const [destinations, setDestinations] = useState([]);
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
