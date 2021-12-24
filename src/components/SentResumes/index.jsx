import style from "./style.module.css";
import { useEffect, useState } from "react";
import useFetch from "../../fetch";
import dotenv from "dotenv";
dotenv.config();

export default function SentResumes(props) {
  const [status, setStatus] = useState("pending");
  const [answer, setAnswer] = useState(true);
  const token = window.localStorage.getItem("access_token");
  const { setShowNavbar } = props;
  setShowNavbar(true);

  const {
    error,
    isPending,
    data: resumes,
  } = useFetch(`${process.env.REACT_APP_API_URL}/requests`);

  function updateResume(playerid, status) {
    fetch(`${process.env.REACT_APP_API_URL}/updateRequests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ playerid: playerid, status: status }),
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

  console.log(resumes);

  return (
    <main>
      <div className={style.title}>resumes</div>
      <div className={style.resumes}>
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {resumes &&
          resumes.map((resume) => (
            <div className={style.resume}>
              <h className="title">{resume.username}</h>
              <div className={style.status}>Status:{resume.status}</div>
              {resume.status != "Pending" ? null : (
                <div className="answer">
                  <div
                    className={style.decline}
                    onClick={() => {
                      setStatus("declined");
                      updateResume(resume.playerid, "declined");
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
                      updateResume(resume.playerid, "accepted");
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
