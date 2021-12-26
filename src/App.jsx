import "./App.css";
import Players from "./components/Players";
import Navbar from "./components/Navbar/Navbar.jsx";
import SelectedTeam from "./components/SelectedTeam";
import Login from "./components/Login";
import Register from "./components/Register";
import SentResumes from "./components/SentResumes";
import Teams from "./components/Teams";
import Invites from "./components/Invites";
import Profile from "./components/Profile";
import Games from "./components/Games";
import HorizontalLinearStepper from "./components/HorizontalLinearStepper.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import SelectedPlayer from "./components/PlayerSelected";
require("dotenv").config();
const checkLogin = () => {
  return !!localStorage.getItem("access_token");
};

const checkPot = () => {
  return !!localStorage.getItem("pot");
};
function RequireAuth({ children }) {
  return !checkLogin() ? <Navigate to="/" /> : children;
}

function CheckTeam({ children }) {
  return checkPot() ? <Navigate to="/" /> : children;
}
function CheckPlayer({ children }) {
  return !checkPot() ? <Navigate to="/" /> : children;
}

function App() {
  const [showNavbar, setShowNavbar] = React.useState(true);
  const [teamName, setTeamName] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const [pot, setPot] = React.useState(true);
  const [production, setProduction] = React.useState(false);
  return (
    <>
      {showNavbar ? <Navbar pot={pot} /> : null}
      <Routes>
        <Route
          path="/"
          element={
            <Login setShowNavbar={setShowNavbar} production={production} />
          }
        />
        <Route
          path="register"
          element={
            <Register setShowNavbar={setShowNavbar} production={production} />
          }
        />
        <Route
          path="SelectedTeam"
          element={
            <RequireAuth>
              <CheckPlayer>
                <SelectedTeam
                  setShowNavbar={setShowNavbar}
                  teamName={teamName}
                  production={production}
                />
              </CheckPlayer>
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
                production={production}
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
                production={production}
              />
            </RequireAuth>
          }
        />

        <Route
          path="invites"
          element={
            <RequireAuth>
              <Invites setShowNavbar={setShowNavbar} production={production} />
            </RequireAuth>
          }
        />
        <Route
          path="requests"
          element={
            <RequireAuth>
              <SentResumes
                setShowNavbar={setShowNavbar}
                production={production}
              />
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
                production={production}
              />
            </RequireAuth>
          }
        />
        <Route
          path="games"
          element={
            <RequireAuth>
              <Games
                setShowNavbar={setShowNavbar}
                production={production}
              ></Games>
            </RequireAuth>
          }
        />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <Profile setShowNavbar={setShowNavbar} production={production} />
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={
            <Login
              setShowNavbar={setShowNavbar}
              production={production}
            ></Login>
          }
        />
      </Routes>
    </>
  );
}

export default App;
