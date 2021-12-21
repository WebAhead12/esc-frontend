import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { languagesOptions } from "../../utils/languages.js";
import { gamesOptions } from "../../utils/games.js";
import React, { useEffect, useState } from "react";

function validateEmail(emailAdress) {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
}

function Register(props) {
  const goTo = useNavigate();

  const { setShowNavbar } = props;
  setShowNavbar(false);

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  const [teamname, setTeamname] = useState("");
  const [game, setGame] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [firstname, setfName] = useState("");
  const [lastname, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [imagelink, setImgLink] = useState("");
  const [languages, setLanguages] = useState([]);

  const [pot, setPot] = useState(true);

  function handleTeamSubmit(event) {
    event.preventDefault();
    if (password !== confirm) console.log("Passwords do not match!");
    else if (!teamname) console.log("Username cannot be empty!");
    else if (!password) console.log("Password cannot be empty!");
    else if (!email) console.log("Email cannot be empty!");
    else if (!validateEmail(email)) console.log("Invalid email!");
    else if (!game) console.log("Please enter your gender!");
    else if (!description) console.log("Please enter a description");
    else {
      const data = {
        username: username,
        name: teamname,
        password: password,
        email: email,
        game: game,
        imagelink: imagelink,
        description: description,
      };
      fetch("http://localhost:4000/registerT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          return response.json();
        })
        .then((data) => {
          if (data.status == "success") {
            goTo("/");
          }
        })
        .catch(console.error);
    }
  }

  function handlePlayerSubmit(event) {
    event.preventDefault();
    if (password !== confirm) console.log("Passwords do not match!");
    else if (!username) console.log("Username cannot be empty!");
    else if (!password) console.log("Password cannot be empty!");
    else if (!email) console.log("Email cannot be empty!");
    else if (!validateEmail(email)) console.log("Invalid email!");
    else if (!gender) console.log("Please enter your gender!");
    else if (languages.length < 1)
      console.log("Please enter atleast 1 language!");
    else if (!firstname) console.log("First name cannot be empty!");
    else if (!lastname) console.log("Last name cannot be empty");
    else if (!date) console.log("Please enter date of birth");
    else {
      const data = {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        email: email,
        date: date,
        gender: gender,
        location: location,
        imagelink,
        languages: languages,
      };

      fetch("http://localhost:4000/registerP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => {
          console.log(response);
        })
        .catch(console.error);
    }
  }

  useEffect(() => {
    let apiKey = "d070a65e781d4eb38537345be1a7ff3b";
    fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=" + apiKey)
      .then((response) => response.json())
      .then((data) => setLocation(data.country));
  }, []);

  useEffect(() => {
    console.log(game);
  }, [game]);

  return pot ? (
    <div>
      <h1 className={style.title}>Register</h1>
      <div className={style.register}>
        <img></img>
        <button
          className={style.playerButton}
          onClick={(e) => {
            setPot(true);
          }}
        >
          Player
        </button>
        <button
          className={style.teamButton}
          onClick={(e) => {
            setPot(false);
          }}
        >
          Team
        </button>
        <form onSubmit={handlePlayerSubmit}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={(e) => setConfirm(e.target.value)}
          />
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="First name"
            onChange={(e) => setfName(e.target.value)}
          />
          <input
            type="text"
            id="lname"
            name="lname"
            placeholder="Last name"
            onChange={(e) => setlName(e.target.value)}
          />
          <Select
            className={style.gender}
            isSearchable={true}
            name="gender"
            options={genderOptions}
            onChange={(e) => setGender(e.value)}
          />
          <Select
            className={style.languages}
            isMulti
            isSearchable={true}
            name="languages"
            options={languagesOptions}
            onChange={(e) => {
              setLanguages(Array.isArray(e) ? e.map((x) => x.label) : []);
            }}
          />
          <input
            type="date"
            id="date"
            name="date"
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="text"
            id="imglink"
            name="imglink"
            placeholder="Profile picture"
            onChange={(e) => setImgLink(e.target.value)}
          />
          <button type="submit">Create an account</button>
        </form>
        <a href="/">Already have an account?</a>
      </div>
    </div>
  ) : (
    <div>
      <h1 className={style.title}>Register</h1>
      <div className={style.register}>
        <img></img>
        <button
          className={style.playerButton}
          onClick={(e) => {
            setPot(true);
          }}
        >
          Player
        </button>
        <button
          className={style.teamButton}
          onClick={(e) => {
            setPot(false);
          }}
        >
          Team
        </button>
        <form onSubmit={handleTeamSubmit}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            id="teamname"
            name="teamname"
            placeholder="Team name"
            onChange={(e) => setTeamname(e.target.value)}
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={(e) => setConfirm(e.target.value)}
          />
          <Select
            className={style.gender}
            isSearchable={true}
            name="game"
            options={gamesOptions}
            onChange={(e) => setGame(e.value)}
          />
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            id="imglink"
            name="imglink"
            placeholder="Team picture"
            onChange={(e) => setImgLink(e.target.value)}
          />

          <button type="submit">Create an account</button>
        </form>
        <a href="/">Already have an account?</a>
      </div>
    </div>
  );
}

export default Register;
