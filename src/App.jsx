import "./App.css";
import { Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import SelectedTeam from "./components/SelectedTeam";
import Login from "./components/Login";
import Register from "./components/Register";
import Teams from "./components/Teams";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";

function App() {
  const [showNavbar, setShowNavbar] = React.useState(true);

  return (
    <>
      {showNavbar ? <Navbar /> : null}
      <Routes>
        <Route
          path="/"
          exact
          element={<Login setShowNavbar={setShowNavbar} />}
        />
        <Route
          path="register"
          element={<Register setShowNavbar={setShowNavbar} />}
        />
        <Route
          path="SelectedTeam"
          element={<SelectedTeam setShowNavbar={setShowNavbar} />}
        />
        <Route path="teams" element={<Teams setShowNavbar={setShowNavbar} />} />
      </Routes>
    </>
  );
}

export default App;
