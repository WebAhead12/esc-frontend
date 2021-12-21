import style from "./style.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useFetch from "../../fetch";

export default function Invites(props) {
  const [invites, setInvites] = useState(null);
  const [status, setStatus] = useState("pending");
  const [answer, setAnswer] = useState(true);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const token = window.localStorage.getItem("access_token");
  const { setShowNavbar } = props;
  setShowNavbar(true);

  useEffect(() => {
    fetch(`http://localhost:4000/invites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
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
      .then((invites) => {
        setIsPending(false);
        setError(null);
        setInvites(invites);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      });
  }, [status]);

  function updateInvite(teamid, status) {
    fetch(`/http://localhost:4000/updateInvites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ teamid: teamid, status: status }),
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
  return (
    <main>
      <div className={style.title}>Invites</div>
      <div className={style.invites}>
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {invites &&
          invites.map((invite) => (
            <div className="invite">
              <h>{invite.teamname}</h>
              <div className="status">{invite.status}</div>
              {answer && (
                <div className="answer">
                  <div
                    onClick={() => {
                      setStatus("declined");
                      setAnswer(false);
                      updateInvite(invite.teamid, status);
                    }}
                  >
                    Decline
                  </div>
                  <div
                    onClick={() => {
                      setStatus("accepted");
                      setAnswer(false);
                      updateInvite(invite.teamid, status);
                    }}
                  >
                    Accept
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </main>
  );
}
