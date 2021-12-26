import style from "./style.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import utils from "../../utils/loginAuth.js";
// const api = "https://escbackend.herokuapp.com";

const Login = (props) => {
  const api = props.production
    ? "https://escbackend.herokuapp.com"
    : "http://localhost:4000";
  //set navbar to hidden on this page
  const goTo = useNavigate();
  useEffect(() => {
    if (utils.checkLogin()) {
      if (pot) {
        goTo("/teams");
      } else {
        goTo("/players");
      }
    }
  }, []);
  const { setShowNavbar } = props;
  setShowNavbar(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [teamData, setTeamData] = useState({
    teamname: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pot, setPot] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (pot == true) {
      axios
        .post(`${api}/loginP`, userData)
        .then((res) => {
          console.log(res);
          setLoading(false);
          if (res.data.success) {
            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("pot", "true");
            goTo("/");
          } else {
            setError(res.status);
          }
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data.status);
          setLoading(false);
        });
    } else {
      axios
        .post(`${api}/loginT`, teamData)
        .then((res) => {
          setLoading(false);

          if (!res.data.success) {
            setError(res.data.message);
          } else {
            window.localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("pot", "false");

            goTo("/");
          }
        })
        .catch((err) => {
          setError(err.response.data.status);
          setLoading(false);
        });
    }
  };
  if (loading) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <div className={style.center}>
        <div className={style.loginHolder}>
          <img
            src="https://i.imgur.com/tOy4ViX.png"
            alt="Logo-Esc"
            className={style.logoImg}
          />
          <br />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "20vw",
            }}
          >
            <button
              className={pot ? style.playerOn : style.playerOff}
              sx={{ width: "50%" }}
              onClick={(e) => {
                setPot(true);
              }}
            >
              Player
            </button>
            <button
              className={pot ? style.teamOff : style.teamOn}
              sx={{ width: "50%" }}
              onClick={(e) => {
                setPot(false);
              }}
            >
              Team
            </button>
          </Box>
          {pot ? (
            <input
              type="text"
              className={style.usernameInput}
              placeholder="Username"
              onChange={(e) =>
                setUserData({
                  username: e.target.value,
                  password: userData.password,
                })
              }
              required
            ></input>
          ) : (
            <input
              type="text"
              className={style.usernameInput}
              placeholder="Teamname"
              onChange={(e) => {
                setTeamData({
                  teamname: e.target.value,
                  password: teamData.password,
                });
              }}
              required
            ></input>
          )}
          {pot ? (
            <input
              type="password"
              className={style.passwordInput}
              placeholder="Password"
              onChange={(e) =>
                setUserData({
                  username: userData.username,
                  password: e.target.value,
                })
              }
              required
            ></input>
          ) : (
            <input
              type="password"
              className={style.passwordInput}
              placeholder="Password"
              onChange={(e) =>
                setTeamData({
                  teamname: teamData.teamname,
                  password: e.target.value,
                })
              }
              required
            ></input>
          )}
          <button className={style.loginButton} onClick={onSubmit}>
            Log-in
          </button>
          <br />
          <span className={style.error}>{error}</span>
          <br />
          <a href="/register" className={style.text}>
            Dont have an account, sign up?
          </a>
        </div>
      </div>
    </div>
  );
};
export default Login;
