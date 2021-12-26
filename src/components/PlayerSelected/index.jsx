import style from "./style.module.css";
import useFetch from "../../fetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const api = "http://localhost:4000";
function SelectedPlayer(props) {
  const goTo = useNavigate();

  const token = window.localStorage.getItem("access_token");
  const { setShowNavbar } = props;
  const [answer, setAnswer] = useState(false);
  const [tosay, Settosay] = useState("Invite Sent");
  setShowNavbar(true);
  const {
    error,
    isPending,
    data: data,
  } = useFetch(`${api}/Selectedplayer/${props.username}`);

  useEffect(() => {
    if (!data) return;

    const player = data ? data[0] : null;

    fetch(`${api}/checkInvites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ playerid: player.id }),
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
          Settosay("Send Request");
        }
      });
  }, [data]);

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
  const player = data ? data[0] : null;
  console.log("stats", player);

  return (
    <div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {player && (
        <div>
          <div className={style.playerDiv}>
            <div className={style.upper}>
              <div className={style.textDiv}>
                <h1 className={style.Name}> {player.username}</h1>
                <p className={style.description}>
                  About {player.username}:{player.description}
                </p>
                <h3>
                  Game:<h6>{player.game}</h6>{" "}
                </h3>
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
      )}
    </div>
  );
}

export default SelectedPlayer;
