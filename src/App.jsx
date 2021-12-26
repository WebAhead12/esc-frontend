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

const getPot = () => {
  if (checkPot) return localStorage.getItem("pot");
};

const checkPot = () => {
  return !!localStorage.getItem("pot");
};
function RequireAuth({ children }) {
  return !checkLogin() ? <Navigate to="/" /> : children;
}

function CheckTeam({ children }) {
  if (checkPot()) {
    if (!getPot()) {
      return children;
    }
  }
  return <Navigate to="/" />;
}
function CheckPlayer({ children }) {
  if (checkPot()) {
    if (getPot()) {
      return children;
    }
  }
  return <Navigate to="/" />;
}

function App() {
  const [showNavbar, setShowNavbar] = React.useState(true);
  const [teamName, setTeamName] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const [pot, setPot] = React.useState(true);
  const [production, setProduction] = React.useState(false);
  const [game, setGame] = React.useState("");
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
              <CheckTeam>
                <SelectedPlayer
                  setShowNavbar={setShowNavbar}
                  username={username}
                  production={production}
                />
              </CheckTeam>
            </RequireAuth>
          }
        />
        <Route
          path="players"
          element={
            <RequireAuth>
              <CheckTeam>
                <Players
                  setShowNavbar={setShowNavbar}
                  username={username}
                  setUsername={setUsername}
                  production={production}
                  game={game}
                />
              </CheckTeam>
            </RequireAuth>
          }
        />

        <Route
          path="invites"
          element={
            <RequireAuth>
              <CheckPlayer>
                <Invites
                  setShowNavbar={setShowNavbar}
                  production={production}
                />
              </CheckPlayer>
            </RequireAuth>
          }
        />
        <Route
          path="requests"
          element={
            <RequireAuth>
              <CheckTeam>
                <SentResumes
                  setShowNavbar={setShowNavbar}
                  production={production}
                />
              </CheckTeam>
            </RequireAuth>
          }
        />
        <Route
          path="teams"
          element={
            <RequireAuth>
              <CheckPlayer>
                <Teams
                  setShowNavbar={setShowNavbar}
                  teamName={teamName}
                  setTeamName={setTeamName}
                  production={production}
                  game={game}
                />
              </CheckPlayer>
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
                setGame={setGame}
                game={game}
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
