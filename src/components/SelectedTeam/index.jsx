import style from "./style.module.css";
import useFetch from "../../fetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import dotenv from "dotenv";
dotenv.config();

function SelectedTeam(props) {
  const goTo = useNavigate();

  const token = window.localStorage.getItem("access_token");
  const { setShowNavbar } = props;
  const [answer, setAnswer] = useState(false);
  const [tosay, Settosay] = useState("Resume Sent");
  setShowNavbar(true);
  const {
    error,
    isPending,
    data: data,
  } = useFetch(
    `${process.env.REACT_APP_API_URL}/Selectedteams/${props.teamName}`
  );

  useEffect(() => {
    if (!data) return;

    const team = data ? data[0] : null;

    fetch(`${process.env.REACT_APP_API_URL}/checkRequests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ teamid: team.id }),
    })
      .then((res) => {
        console.log(res, "res");
        if (!res.ok) {
          const error = new Error("HTTP error");
          error.status = res.status;
          throw error;
        } else {
          return res.json();
        }
      })
      .then((check) => {
        console.log("check", check);
        if (!check.length) {
          setAnswer(true);
          Settosay("Send Resume");
        }
      });
  }, [data]);

  function addResume(teamid) {
    if (answer) {
      fetch(`${process.env.REACT_APP_API_URL}/addRequests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ teamid: teamid }),
      }).then((res) => {
        console.log(res, "res");
        if (!res.ok) {
          const error = new Error("HTTP error");
          error.status = res.status;
          throw error;
        } else {
          return res.json();
        }
      });
    }
  }
  const team = data ? data[0] : null;
  console.log("stats", team);
  return (
    <div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {team && (
        <div className={style.teamDiv}>
          <div className={style.upper}>
            <div className={style.textDiv}>
              <h1 className={style.Name}> {team.teamname}</h1>
              <p className={style.description}>
                {/* About {team.teamname}:{team.description} */}
              </p>
              <h3>Requirement:</h3>
              {/* <ul className={style.requirements}>
                {Object.keys(team.requirements).map((key) => {
                  return <li>{`${key}: ${team.requirements[key]}`}</li>;
                })}
              </ul> */}
            </div>

            <img src={team.imagelink} alt="logo" className={style.img} />
          </div>
          <div className={style.buttons}>
            <button onClick={() => goTo("/teams")} className={style.backButton}>
              Back
            </button>
            <button
              onClick={() => {
                addResume(team.id);
                goTo("/teams");
              }}
              className={style.sendResumeButton}
            >
              {tosay}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectedTeam;
