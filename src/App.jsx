import "./App.css";
import Players from "./components/Players";
import Navbar from "./components/Navbar/Navbar.jsx";
import SelectedTeam from "./components/SelectedTeam";
import Login from "./components/Login";
import Register from "./components/Register";
import SentResumes from "./components/SentResumes";
import Teams from "./components/Teams";
import Invites from "./components/Invites";
import Games from "./components/Games";
import HorizontalLinearStepper from "./components/HorizontalLinearStepper.jsx";
import { Routes, Route, Navigate } from "react-router-dom";

import React from "react";
import SelectedPlayer from "./components/PlayerSelected";

const checkLogin = () => {
  return !!localStorage.getItem("access_token");
};

function RequireAuth({ children }) {
  return !checkLogin() ? <Navigate to="/" /> : children;
}

function App() {
  const [showNavbar, setShowNavbar] = React.useState(true);
  const [teamName, setTeamName] = React.useState(null);
  const [username, setUsername] = React.useState(null);

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
            <RequireAuth>
              <SelectedTeam setShowNavbar={setShowNavbar} teamName={teamName} />
            </RequireAuth>
          }
        />
        <Route
          path="SelectedPlayer"
          element={
            <RequireAuth>
              <SelectedPlayer
                setShowNavbar={setShowNavbar}
                username={username}
              />
            </RequireAuth>
          }
        />
        <Route
          path="players"
          element={
            <RequireAuth>
              <Players
                setShowNavbar={setShowNavbar}
                username={username}
                setUsername={setUsername}
              />
            </RequireAuth>
          }
        />

        <Route
          path="invites"
          element={
            <RequireAuth>
              <Invites setShowNavbar={setShowNavbar} />
            </RequireAuth>
          }
        />
        <Route
          path="requests"
          element={
            <RequireAuth>
              <SentResumes setShowNavbar={setShowNavbar} />
            </RequireAuth>
          }
        />
        <Route
          path="teams"
          element={
            <RequireAuth>
              <Teams
                setShowNavbar={setShowNavbar}
                teamName={teamName}
                setTeamName={setTeamName}
              />
            </RequireAuth>
          }
        />
        <Route
          path="games"
          element={
            <RequireAuth>
              <Games setShowNavbar={setShowNavbar}></Games>
            </RequireAuth>
          }
        />
        <Route
          path="test"
          element={
            <HorizontalLinearStepper
              setShowNavbar={setShowNavbar}
            ></HorizontalLinearStepper>
          }
        />
      </Routes>
    </>
  );
}

export default App;
