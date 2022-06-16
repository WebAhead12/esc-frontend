import style from "./style.module.css";
import { useNavigate } from "react-router";
import useFetch from "../../fetch";

export default function PlayersByGame(props) {
  //fetches all players by game
  const goTo = useNavigate();
  const {
    error,
    isPending,
    data: players,
  } = useFetch(`http://localhost:4000/players/${props.game}`);

  const { setShowNavbar } = props;
  setShowNavbar(true);

  return (
    <main>
      <div className={style.title}>Players: {props.game}</div>
      <div className={style.players}>
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {players &&
          players.map((player) => (
            <div
              className={style.player}
              key={player.id}
              onClick={() => {
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
