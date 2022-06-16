import style from "./style.module.css";
import { useNavigate } from "react-router";
import useFetch from "../../fetch";

export default function Players(props) {
  //fetches all players
  const api = props.production
    ? "https://escbackend.herokuapp.com"
    : "http://localhost:4000";
  const { error, isPending, data: players } = useFetch(`${api}/players`);
  const goTo = useNavigate();
  props.setShowNavbar(true);
  //returns all players
  return (
    <main>
      <div className={style.title}>Players</div>
      <div className={style.players}>
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {players &&
          players.map((player) => (
            <div
              className={style.player}
              key={player.id}
              onClick={() => {
                //when clicked on player it sets its username and goes to selected player
                props.setUsername(player.username);
                goTo("/SelectedPlayer");
              }}
            >
              <div className="playerPreview">
                <div className={style.text}>
                  <h3>{player.username}</h3>
                  <p className={style.description}>{player.description}</p>
                  <p className={style.gender}>Gender:{player.gender}</p>
                  <p className={style.location}>Location:{player.location}</p>
                </div>
                <img className={style.playerimg} src={player.imagelink} />
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
