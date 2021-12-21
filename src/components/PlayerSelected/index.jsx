import style from "./style.module.css";
import useFetch from "../../fetch";
function SelectedPlayer(props) {
  //set navbar to shown on this page
  const { setShowNavbar } = props;
  const [answer, setAnswer] = useState("Send Request");
  setShowNavbar(true);

  const {
    error,
    isPending,
    data: data,
  } = useFetch(`http://localhost:4000/Selectedplayer/${props.username}`);

  function addRequest(playerid) {
    if (answer == "Send Request") {
      fetch(`http://localhost:4000/addRequests`, {
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
    setAnswer("Request Sent");
  }
  const player = data ? data[0] : null;
  return (
    <div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {pla && (
        <div>
            <div className={style.teamDiv}>
                <div className={style.upper}>
                    <div className={style.textDiv}>
                        <h1 className={style.Name}> {player.username}</h1>
                        <p className={style.description}>
                            About {player.username}:{player.description}
                        </p>
                        <h3>Game:<h6>{player.game}</h6> </h3>
                    </div>

                    <img src={player.imagelink} alt="logo" className={style.img} />
                </div>
                <div className={style.buttons}>
                    <button className={style.backButton} onClick={() => { goTo("/Players") }}>Back</button>
                    <button onClick={() => addRequest()} className={style.sendRequestButton}>{answer}</button>
                </div>
            </div>
        </div>
    
  )}
    </div>

export default SelectedPlayer;
