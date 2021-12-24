import style from "./style.module.css";
import { useNavigate } from "react-router";
import useFetch from "../../fetch";
import dotenv from "dotenv";
dotenv.config();

export default function Players(props) {
  const {
    error,
    isPending,
    data: players,
  } = useFetch(`${process.env.REACT_APP_API_URL}/players`);
  console.log(players);
  const goTo = useNavigate();
  props.setShowNavbar(true);

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
