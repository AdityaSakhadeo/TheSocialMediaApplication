import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Profile from "./components/Profile";
import ForgotPass from "./screens/ForgotPass.js";
import "./App.css";
import { Provider } from "react-redux";
import {store} from './redux/store/store.js';
import ResetPass from "./screens/ResetPass.js";


export default function App() {


  return (
    <>
    <Provider store={store} >
      <Router>
        <Routes>
        <Route path="/" element={<Login />}/> 
        <Route  path="/signup" element={<Signup />} />
        <Route  path="/home" element={<Home />} />
        <Route  path="/profile" element={<Profile />} />
        <Route  path="/forgotpass" element={<ForgotPass />} />
        <Route  path="/resetpass" element={<ResetPass/>} />
        </Routes>
      </Router>
      </Provider>
    </>
  );
}
