import style from "./style.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  //set navbar to hidden on this page
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
  const history = useNavigate();
  const [pot, setPot] = useState(true);
  const onChange =
    (stateKey) =>
    ({ target }) =>
      setUserData({ ...userData, [stateKey]: target.value });

  const onSubmit = () => {
    setLoading(true);
    if (pot == true) {
      axios
        .post("http://localhost:4000/loginP", userData)
        .then((res) => {
          setLoading(false);

          if (!res.data.success) {
            setError(res.data.message);
          } else {
            localStorage.setItem("token", res.data.token);
            history("/");
          }
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

          if (!res.data.success) {
            setError(res.data.message);
          } else {
            localStorage.setItem("token", res.data.token);
            history("/");
          }
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    console.log(pot);
  }, [pot]);

  if (loading) {
    return (
      <div class="container">
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
          {pot ? (
            <input
              type="text"
              className={style.usernameInput}
              placeholder="Username"
              onChange={(e) => setUserData([e.target.value, userData[1]])}
              required
            ></input>
          ) : (
            <input
              type="text"
              className={style.usernameInput}
              placeholder="Team-name"
              onChange={(e) => setTeamData([e.target.value, teamData[1]])}
              required
            ></input>
          )}

          <br />
          {pot ? (
            <input
              type="password"
              className={style.passwordInput}
              placeholder="Password"
              onChange={(e) => setUserData([userData[0], e.target.value])}
              required
            ></input>
          ) : (
            <input
              type="password"
              className={style.passwordInput}
              placeholder="Password"
              onChange={(e) => setTeamData([teamData[0], e.target.value])}
              required
            ></input>
          )}

          <br />
          <button
            className={style.loginButton}
            type="log-in"
            onClick={onSubmit}
          >
            Login
          </button>
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
