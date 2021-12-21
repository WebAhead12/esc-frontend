import style from "./style.module.css";
import useFetch from "../../fetch";
function SelectedTeam(props) {
  //set navbar to shown on this page
  const { setShowNavbar } = props;
  const [answer, setAnswer] = useState("Send Resume");
  setShowNavbar(true);

  const {
    error,
    isPending,
    data: data,
  } = useFetch(`http://localhost:4000/Selectedteams/${props.teamName}`);

  function addResume(teamid) {
    if (answer == "Send Resume") {
      fetch(`http://localhost:4000/addRequests`, {
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
    setAnswer("Resume Sent");
  }
  const team = data ? data[0] : null;
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
                About {team.teamname}:{team.description}
              </p>
              <h3>Requirement:</h3>
              <ul className={style.requirements}>
                {Object.keys(team.requirements).map((key) => {
                  return <li>{`${key}: ${team.requirements[key]}`}</li>;
                })}
              </ul>
            </div>

            <img src={team.imagelink} alt="logo" className={style.img} />
          </div>
          <div className={style.buttons}>
            <button className={style.backButton}>Back</button>
            <button
              onClick={() => addResume()}
              className={style.sendResumeButton}
            >
              {answer}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectedTeam;
