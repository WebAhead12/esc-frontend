import style from "./style.module.css";
import useFetch from "../../fetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
function SelectedPlayer(props) {
  const goTo = useNavigate();
  const api = props.production
    ? "https://escbackend.herokuapp.com"
    : "http://localhost:4000";
  const token = window.localStorage.getItem("access_token");
  const { setShowNavbar } = props;
  setShowNavbar(true);
  const [answer, setAnswer] = useState(false);
  const [tosay, Settosay] = useState("Invite Sent");
  const [player, setPlayer] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const { game } = props;

  useEffect(() => {
    console.log("username" + props.username);
    setIsPending(true);
    fetch(`${api}/Selectedplayer/${props.username}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
        setPlayer(data[0]);
        setIsPending(false);
      });
  }, []);

  useEffect(() => {
    console.log("player: " + player);
    fetch(`${api}/checkInvites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ playerid: player.id }),
    })
      .then((res) => {
        if (!res.ok) {
          const error = new Error("HTTP error");
          error.status = res.status;
          throw error;
        } else {
          return res.json();
        }
      })
      .then((check) => {
        if (!check.length) {
          setAnswer(true);
          Settosay("Send Request");
        }
      });
  }, [player]);

  function addInvite(playerid) {
    if (answer) {
      fetch(`${api}/addInvites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ playerid: playerid }),
      }).then((res) => {
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

  return (
    <div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {player ? (
        <div>
          <div className={style.playerDiv}>
            <div className={style.upper}>
              <div className={style.textDiv}>
                <h1 className={style.Name}> {player.username}</h1>
                <p className={style.description}>
                  About {player.username}:<br />
                  Fullname: {player.firstname + " " + player.lastname}
                  <br />
                  Location:{player.location}
                  <br />
                  languages:
                  {player.languages
                    ? player.languages.replaceAll(/{|}|"/g, "")
                    : null}
                  <br />
                  Date of birth:{player.age}
                </p>
                <h3>{game} Stats:</h3>
              </div>

              <img src={player.imagelink} alt="logo" className={style.img} />
            </div>
            <div className={style.buttons}>
              <button
                className={style.backButton}
                onClick={() => {
                  goTo("/Players");
                }}
              >
                Back
              </button>

              <button
                onClick={() => {
                  addInvite(player.id);
                  goTo("/Players");
                }}
                className={style.sendRequestButton}
              >
                {tosay}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SelectedPlayer;
