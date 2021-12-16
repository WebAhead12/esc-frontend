import "./App.css";
// import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import SelectedTeam from "./components/SelectedTeam"
import Login from "./components/Login"
import Register from "./components/Register"
import Teams from "./components/Teams";
import React from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="SelectedTeam" element={<SelectedTeam />} />
          <Route path="teams" element={<Teams />} />
        </Switch>
      </Router></div>
  );
}

export default App;
