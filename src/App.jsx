import "./App.css";
import Players from "./components/Players";
import Navbar from "./components/Navbar/Navbar.jsx";
import SelectedTeam from "./components/SelectedTeam";
import Login from "./components/Login";
import Register from "./components/Register";
import Teams from "./components/Teams";
import { Routes, Route } from "react-router-dom";

import React from "react";

function App() {
  const [showNavbar, setShowNavbar] = React.useState(true);
  const [teamName, setTeamName] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <>
      {showNavbar ? <Navbar /> : null}
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Login
              setShowNavbar={setShowNavbar}
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          path="register"
          element={
            <Register
              setShowNavbar={setShowNavbar}
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          path="SelectedTeam"
          element={
            <SelectedTeam
              setShowNavbar={setShowNavbar}
              teamName={teamName}
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          path="players"
          element={
            <Players
              setShowNavbar={setShowNavbar}
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          path="teams"
          element={
            <Teams
              setShowNavbar={setShowNavbar}
              teamName={teamName}
              setTeamName={setTeamName}
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
