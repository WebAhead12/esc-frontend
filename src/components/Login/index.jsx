import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
function Login(props) {
  //set navbar to hidden on this page
  const { setShowNavbar } = props;
  setShowNavbar(false);

  return (
    <div>
      <div className={style.center}>
        <div className={style.loginHolder}>
          <img src="" alt="Logo-Esc" className={style.logoImg} />
          <br />
          <input
            type="text"
            className={style.usernameInput}
            placeholder="Username/Team-name"
            required
          ></input>
          <br />
          <input
            type="password"
            className={style.passwordInput}
            placeholder="Password"
            required
          ></input>
          <br />
          <button className={style.loginButton}>Login</button>
          <br />
          <a href="/register" className={style.text}>
            I dont have an account,sign up?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
