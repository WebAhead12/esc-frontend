import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import SelectedTeam from "./components/SelectedTeam";
import Login from "./components/Login";
import Teams from "./components/Teams";
import Players from "./components/Players";
import SelectedPlayer from "./components/PlayerSelected";
import { Routes, Route } from "react-router-dom";
import Games from "./components/Games";
import React from "react";

function App() {
  const [showNavbar, setShowNavbar] = React.useState(true);

  return (
    <>
      {showNavbar ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<Login setShowNavbar={setShowNavbar} />} />
        <Route
          path="SelectedTeam"
          element={<SelectedTeam setShowNavbar={setShowNavbar} />}
        />
        <Route path="teams" element={<Teams setShowNavbar={setShowNavbar} />} />
        <Route
          path="players"
          element={<Players setShowNavbar={setShowNavbar} />}
        />
        <Route
          path="selectedPlayer"
          element={<SelectedPlayer setShowNavbar={setShowNavbar} />}
        />
        <Route
          path="/games"
          element={<Games setShowNavbar={setShowNavbar} />}
        />
      </Routes>
    </>
  );
}

export default App;
