import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import "./App.css";



export default function App() {


  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route  path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}
