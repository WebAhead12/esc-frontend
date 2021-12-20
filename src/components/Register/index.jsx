import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { languagesOptions } from "./languages.js";
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

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

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

  function handleSubmit(event) {
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
      }).catch(console.error);
    }
  }

  useEffect(() => {
    let apiKey = "d070a65e781d4eb38537345be1a7ff3b";
    fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=" + apiKey)
      .then((response) => response.json())
      .then((data) => setLocation(data.country));
  }, []);

  return (
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
        <form onSubmit={handleSubmit}>
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
  );
}

export default Register;
