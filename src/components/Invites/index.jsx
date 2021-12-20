import style from "./style.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useFetch from "../../fetch";

export default function Invites(props) {
  const [invites, setInvites] = useState(null);

  fetch(`http://localhost:4000/invites`, {
    headers: { authorization: `Bearer ${token}` },
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
      setInvites(invites);
    });

  const goTo = useNavigate();

  return (
    <main>
      <div className={style.title}>Invites</div>
      <div className={style.invites}>
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {invites &&
          invites.map((invite) => (
            <div className={style.invite} key={invite.id}>
              <div className={style.text}>
                <h3>{invite.teamname}</h3>
                <h3>{invite.status}</h3>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
