import "./App.css";
import { Routes, Route } from "react-router-dom";
import SelectedTeam from "./components/SelectedTeam"
import Login from "./components/Login"
import Register from "./components/Register"
import Teams from "./components/Teams";
import React from "react";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="SelectedTeam" element={<SelectedTeam />} />
        <Route path="teams" element={<Teams />} />
      </Routes></div>
  );
}

export default App;
