import style from "./style.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import utils from "../../utils/loginAuth.js";

const Login = (props) => {
  //set navbar to hidden on this page
  const history = useNavigate();
  if (props.loggedIn) history("/teams");
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
    console.log(userData);
    setLoading(true);
    if (pot == true) {
      axios
        .post("http://localhost:4000/loginP", userData)
        .then((res) => {
          setLoading(false);
          localStorage.setItem("access_token", res.data.access_token);
          history("/teams");
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      axios
        .post("http://localhost:4000/loginT", teamData)
        .then((res) => {
          setLoading(false);
          localStorage.setItem("access_token", res.data.access_token);
          history("/players");
        })
        .catch((err) => {
          setError(err.message);
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
          <img src="" alt="Logo-Esc" className={style.logoImg} />
          <br />
          <button
            onClick={(e) => {
              setPot(true);
            }}
          >
            {" "}
            Player
          </button>
          <button
            onClick={(e) => {
              setPot(false);
            }}
          >
            {" "}
            Team{" "}
          </button>
          <form onSubmit={onSubmit}>
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
                placeholder="Team-name"
                onChange={(e) =>
                  setTeamData({
                    teamname: e.target.value,
                    password: teamData.password,
                  })
                }
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
                    username: teamData.username,
                    password: e.target.value,
                  })
                }
                required
              ></input>
            )}
            <button className={style.loginButton} type="submit">
              {" "}
              Log-in
            </button>
          </form>
          <br />
          {error && <span class="error">{error}</span>}
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
