import "./App.css";
import { Switch } from "react-router-dom";
import Players from "./components/Players";
import Navbar from "./components/Navbar/Navbar.jsx";
import SelectedTeam from "./components/SelectedTeam";
import Login from "./components/Login";
import Register from "./components/Register";
import Teams from "./components/Teams";
import Players from "./components/Players";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";

function App() {
  const [showNavbar, setShowNavbar] = React.useState(true);
  const [teamName, setTeamName] = React.useState(null);

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
          element={
            <SelectedTeam setShowNavbar={setShowNavbar} teamName={teamName} />
          }
        />
        <Route
          path="players"
          element={<Players setShowNavbar={setShowNavbar} />}
        />
        <Route
          path="teams"
          element={
            <Teams
              setShowNavbar={setShowNavbar}
              teamName={teamName}
              setTeamName={setTeamName}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
