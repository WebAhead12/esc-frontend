import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home"
import About from "./components/About"
import Login from "./components/Login"
import Register from "./components/Register"
import { useNavigate } from "react-router-dom"
import React from "react"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="register" element={<Register />} />
      </Routes></div>
  );
}

export default App;
