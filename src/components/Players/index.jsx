import style from "./style.module.css";
import { useNavigate } from "react-router";
import useFetch from "../../fetch";

export default function Players(props) {
  const {
    error,
    isPending,
    data: players,
  } = useFetch("http://localhost:4000/players");

  const goTo = useNavigate();
  const { setShowNavbar } = props;
  setShowNavbar(true);
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
                console.log(props.username);

                goTo("/SelectedPlayer");
              }}
            >
              <div className="playerPreview">
                <div className={style.text}>
                  <h3>{player.username}</h3>
                  <p className={style.description}>{player.description}</p>
                </div>
                <img className={style.playerimg} src={player.imagelink} />
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
