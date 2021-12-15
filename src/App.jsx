import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import SelectedTeam from "./components/SelectedTeam"
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
        <Route path="register" element={<Register />} />
        <Route path="SelectedTeam" element={<SelectedTeam />} />
      </Routes></div>
  );
}

export default App;
