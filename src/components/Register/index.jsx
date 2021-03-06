import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Select from "react-select";
import Input from "@mui/material/Input";
import { useState, useEffect } from "react";
import { languagesOptions } from "../../utils/languages.js";
import { gamesOptions } from "../../utils/games.js";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import utils from "../../utils/loginAuth.js";
const steps = ["Add account info", "Add stats"];

function validateEmail(emailAdress) {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
}

export default function Register(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const api = props.production
    ? "https://escbackend.herokuapp.com"
    : "http://localhost:4000";

  const goTo = useNavigate();
  useEffect(() => {
    const { setShowNavbar } = props;
    setShowNavbar(false);
    if (utils.checkLogin()) {
      if (pot) {
        goTo("/teams");
      } else {
        goTo("/players");
      }
    }
  }, []);

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  const [error, setError] = useState("");
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
  const [gender, setGender] = useState({ value: "male", label: "Male" });
  const [imagelink, setImgLink] = useState("");
  const [languages, setLanguages] = useState([
    { value: "en", label: "English" },
  ]);
  const [selectedGame, setSelectedGame] = useState({ value: "", label: "" });
  const [stats, setStats] = useState({
    rl: null,
    lol: null,
    csgo: null,
    dota2: null,
    ow: null,
    brawlhalla: null,
    apex: null,
    pubg: null,
    valorant: null,
    r6: null,
  });
  const [showStats, setShowStats] = useState(false);

  const games = {
    rl: "Rocket league",
    lol: "League of legends",
    csgo: "Coutner strike",
    apex: "Apex Legends",
    brawlhalla: "Brawlhalla",
    r6: "Rainbow six siege",
    pubg: "PUBG",
    ow: "Overwatch",
    dota2: "Dota 2",
    valorant: "Valorant",
  };
  const [rank, setRank] = useState("");
  const [role, setRole] = useState("");
  const [opgg, setOpgg] = useState("");
  const [ign, setIgn] = useState("");

  const [requirements, setRequirements] = useState({
    rank: null,
    role: null,
  });

  const [pot, setPot] = useState(true);

  function handleTeamSubmit(event) {
    const data = {
      teamname: username,
      name: teamname,
      password: password,
      email: email,
      game: game.value,
      imagelink: imagelink,
      description: description,
      requirements: requirements,
    };
    fetch(`${api}/registerT`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status == "success") {
          goTo("/");
        } else {
          setError(data.status);
        }
      })
      .catch((error) => console.log(error));
  }

  function handlePlayerSubmit(event) {
    const languagesArr = languages.map((language) => language.label);

    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email,
      date: date,
      gender: gender.value,
      location: location,
      imagelink,
      languages: languagesArr,
      stats: stats,
    };
    fetch(`${api}/registerP`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status == "success") {
          goTo("/");
        } else {
          setError(data.status);
        }
      })
      .catch(console.error);
  }

  useEffect(() => {
    let apiKey = "d070a65e781d4eb38537345be1a7ff3b";
    fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=" + apiKey)
      .then((response) => response.json())
      .then((data) => setLocation(data.country));
  }, []);

  const handleNext = () => {
    if (pot) {
      if (password !== confirm) setError("Passwords do not match!");
      else if (!username) setError("Username cannot be empty!");
      else if (!password) setError("Password cannot be empty!");
      else if (!email) setError("Email cannot be empty!");
      else if (!validateEmail(email)) setError("Invalid email!");
      else if (!gender) setError("Please enter your gender!");
      else if (languages.length < 1)
        setError("Please enter atleast 1 language!");
      else if (!firstname) setError("First name cannot be empty!");
      else if (!lastname) setError("Last name cannot be empty");
      else if (!date) setError("Please enter date of birth");
      else {
        setError("");
        if (activeStep == steps.length - 1) {
          if (pot) {
            handlePlayerSubmit();
          } else {
            handleTeamSubmit();
          }
        }
        if (activeStep === steps.length - 1) return;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      if (password !== confirm) setError("Passwords do not match!");
      else if (!teamname) setError("Username cannot be empty!");
      else if (!password) setError("Password cannot be empty!");
      else if (!email) setError("Email cannot be empty!");
      else if (!validateEmail(email)) setError("Invalid email!");
      else if (!game) setError("Please enter your gender!");
      else if (!description) setError("Please enter a description");
      else {
        setError("");
        if (activeStep == steps.length - 1) {
          if (pot) {
            handlePlayerSubmit();
          } else {
            handleTeamSubmit();
          }
        }
        if (activeStep === steps.length - 1) return;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "50vw", margin: "auto", marginTop: "2vh" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        {activeStep === 0 ? (
          pot ? (
            <Box>
              <Box className={style.register}>
                <Box
                  sx={{
                    margin: "auto",
                    display: "block",
                  }}
                  component="img"
                  src="https://i.imgur.com/tOy4ViX.png"
                />
                <Typography
                  sx={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "2rem",
                    textAlign: "center",
                  }}
                >
                  Register
                </Typography>
                <Box
                  className={style.buttonContainer}
                  sx={{
                    display: "flex",
                    margin: "auto",
                    justifyContent: "space-around",
                    padding: "15px",
                  }}
                >
                  <Button
                    className={style.playerButton}
                    onClick={(e) => {
                      setPot(true);
                    }}
                  >
                    Player
                  </Button>
                  <Button
                    className={style.teamButton}
                    onClick={(e) => {
                      setPot(false);
                    }}
                  >
                    Team
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "20px",
                      width: "50%",
                      padding: "10px",
                    }}
                  >
                    <Input
                      sx={{ marginTop: "15px" }}
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                      sx={{ marginTop: "15px" }}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      sx={{ marginTop: "15px" }}
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      sx={{ marginTop: "15px" }}
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                      padding: "10px",
                    }}
                  >
                    <Input
                      sx={{ marginTop: "15px" }}
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder="First name"
                      value={firstname}
                      onChange={(e) => setfName(e.target.value)}
                    />
                    <Input
                      sx={{ marginTop: "15px" }}
                      type="text"
                      id="lname"
                      name="lname"
                      placeholder="Last name"
                      value={lastname}
                      onChange={(e) => setlName(e.target.value)}
                    />
                    <Input
                      sx={{ marginTop: "15px" }}
                      type="text"
                      id="imglink"
                      name="imglink"
                      placeholder="Profile picture"
                      value={imagelink}
                      onChange={(e) => setImgLink(e.target.value)}
                    />
                    <Input
                      sx={{ marginTop: "15px" }}
                      type="date"
                      id="date"
                      name="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </Box>
                </Box>
                <Box sx={{ padding: "10px" }}>
                  <Select
                    className={style.gender}
                    isSearchable={true}
                    name="gender"
                    options={genderOptions}
                    value={gender}
                    onChange={(e) => setGender(e)}
                  />
                  <Select
                    className={style.languages}
                    isMulti
                    isSearchable={true}
                    name="languages"
                    options={languagesOptions}
                    value={languages}
                    onChange={(e) => {
                      setLanguages(e);
                    }}
                  />
                </Box>
                <a href="/" style={{ display: "block", textAlign: "center" }}>
                  Already have an account?
                </a>
              </Box>
            </Box>
          ) : (
            <div>
              <div className={style.register}>
                <Box
                  sx={{
                    margin: "auto",
                    display: "block",
                  }}
                  component="img"
                  src="https://i.imgur.com/tOy4ViX.png"
                />
                <Typography
                  sx={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "2rem",
                    textAlign: "center",
                  }}
                >
                  Register
                </Typography>
                <Box
                  className={style.buttonContainer}
                  sx={{
                    display: "flex",
                    margin: "auto",
                    justifyContent: "space-around",
                    padding: "15px",
                  }}
                >
                  <Button
                    className={style.playerButton}
                    onClick={(e) => {
                      setPot(true);
                    }}
                  >
                    Player
                  </Button>
                  <Button
                    className={style.teamButton}
                    onClick={(e) => {
                      setPot(false);
                    }}
                  >
                    Team
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                      padding: "10px",
                    }}
                  >
                    <Input
                      sx={{ marginTop: "15px" }}
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                      sx={{ marginTop: "15px" }}
                      type="text"
                      id="teamname"
                      name="teamname"
                      placeholder="Team name"
                      value={teamname}
                      onChange={(e) => setTeamname(e.target.value)}
                    />
                    <Input
                      sx={{ marginTop: "15px" }}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      sx={{ marginTop: "15px" }}
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                      padding: "10px",
                    }}
                  >
                    <Input
                      sx={{ marginTop: "15px" }}
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                    <Input
                      sx={{ marginTop: "15px" }}
                      type="text"
                      id="imglink"
                      name="imglink"
                      placeholder="Team picture"
                      value={imagelink}
                      onChange={(e) => setImgLink(e.target.value)}
                    />
                    <TextField
                      multiline
                      sx={{ marginTop: "15px" }}
                      rows={2}
                      type="text"
                      id="description"
                      name="description"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Box>
                </Box>
                <Select
                  className={style.gender}
                  isSearchable={true}
                  name="game"
                  options={gamesOptions}
                  value={game}
                  onChange={(e) => setGame(e)}
                />
                <a href="/" style={{ display: "block", textAlign: "center" }}>
                  Already have an account?
                </a>
              </div>
            </div>
          )
        ) : pot ? (
          <Box>
            <Select
              className={style.game}
              isSearchable={true}
              name="game"
              options={gamesOptions}
              value={selectedGame}
              onChange={(e) => {
                setSelectedGame(e);
                setShowStats(true);
              }}
            />
            {selectedGame.value ? (
              <Box>
                {showStats ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "40vw",
                      margin: "auto",
                      textAlign: "center",
                    }}
                  >
                    <Typography>{selectedGame.label}</Typography>
                    <Input
                      sx={{ marginTop: "15px" }}
                      placeholder="IGN"
                      value={ign}
                      onChange={(e) => {
                        setIgn(e.target.value);
                      }}
                    />
                    <Input
                      sx={{ marginTop: "15px" }}
                      placeholder="Rank"
                      value={rank}
                      onChange={(e) => {
                        setRank(e.target.value);
                      }}
                    />
                    <Input
                      sx={{ marginTop: "15px" }}
                      placeholder="Role"
                      value={role}
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                    />
                    <Input
                      sx={{ marginTop: "15px" }}
                      placeholder="OP.GG link"
                      value={opgg}
                      onChange={(e) => {
                        setOpgg(e.target.value);
                      }}
                    />
                    <Button
                      onClick={(e) => {
                        setStats({
                          ...stats,
                          [selectedGame.value]: {
                            ign: ign,
                            rank: rank,
                            role: role,
                            opgg: opgg,
                          },
                        });
                        setIgn("");
                        setRank("");
                        setRole("");
                        setOpgg("");
                        setShowStats(false);
                      }}
                    >
                      Done
                    </Button>
                  </Box>
                ) : null}
                <Box>
                  <ul>
                    {Object.keys(stats)
                      .map((statsKey) => (stats[statsKey] ? statsKey : null))
                      .filter((x) => x)
                      .map((key) => (
                        <li
                          onClick={(e) => {
                            setRole(stats[key].role);
                            setOpgg(stats[key].opgg);
                            setRank(stats[key].rank);
                            setIgn(stats[key].ign);
                            setSelectedGame({
                              value: key,
                              label: games[key],
                            });
                            setShowStats(true);
                          }}
                        >
                          {games[key]}
                        </li>
                      ))}
                  </ul>
                </Box>
              </Box>
            ) : null}
          </Box>
        ) : (
          <Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "40vw",
                  margin: "auto",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ fontFamily: "Orbitron, sans-serif" }}>
                  {game.label} Requirements
                </Typography>
                <Input
                  sx={{ marginTop: "15px" }}
                  placeholder="Rank"
                  value={requirements.rank}
                  onChange={(e) => {
                    setRequirements({
                      ...requirements,
                      rank: e.target.value,
                    });
                  }}
                />
                <Input
                  sx={{ marginTop: "15px" }}
                  placeholder="Role"
                  value={requirements.role}
                  onChange={(e) => {
                    setRequirements({
                      ...requirements,
                      role: e.target.value,
                    });
                  }}
                />
              </Box>
            </Box>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            pt: 2,
            justifyContent: "space-between",
          }}
        >
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
        <Typography
          sx={{ color: "#e5002a", display: "block", textAlign: "center" }}
        >
          {error}
        </Typography>
      </React.Fragment>
    </Box>
  );
}
