import style from "./style.module.css";
import { useEffect, useState } from "react";
import useFetch from "../../fetch";

export default function Invites(props) {
  const [status, setStatus] = useState("pending");
  const [answer, setAnswer] = useState(true);
  const token = window.localStorage.getItem("access_token");
  const { setShowNavbar } = props;
  const api = props.production
    ? "https://escbackend.herokuapp.com"
    : "http://localhost:4000";
  setShowNavbar(true);

  const { error, isPending, data: invites } = useFetch(`${api}/invites`);

  function updateInvite(teamid, status) {
    fetch(`${api}/updateInvites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ teamid: teamid, status: status }),
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

  return (
    <main>
      <div className={style.title}>Invites</div>
      <div className={style.invites}>
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {invites &&
          invites.map((invite) => (
            <div className={style.invite}>
              <h className="title">{invite.teamname}</h>
              <div className={style.status}>Status:{invite.status}</div>
              {invite.status != "Pending" ? (
                <div>Emails Email:{invite.email} </div>
              ) : (
                <div className="answer">
                  <div
                    className={style.decline}
                    onClick={() => {
                      setStatus("declined");
                      updateInvite(invite.teamid, "declined");
                      window.location.reload();
                    }}
                  >
                    Decline
                  </div>

                  <div
                    className={style.accept}
                    onClick={() => {
                      setStatus("accepted");
                      setAnswer(false);
                      updateInvite(invite.teamid, "accepted");
                      window.location.reload();
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
