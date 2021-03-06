import style from "./style.module.css";
import { useNavigate } from "react-router";
import useFetch from "../../fetch";

export default function Teams(props) {
  const goTo = useNavigate();
  const api = props.production
    ? "https://escbackend.herokuapp.com"
    : "http://localhost:4000";
  //fetches all teams
  const { error, isPending, data: teams } = useFetch(`${api}/teams`);
  const { setShowNavbar } = props;
  setShowNavbar(true);

  return (
    <main>
      <div className={style.title}>All Teams</div>
      <div className={style.teams}>
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {teams &&
          teams.map((team) => (
            <div
              className={style.team}
              key={team.id}
              onClick={() => {
                props.setTeamName(team.teamname);
                goTo("/Selectedteam");
              }}
            >
              <div className={style.teamPreview}>
                <div className={style.text}>
                  <h3>{team.teamname}</h3>
                  <p className={style.description}>{team.description}</p>
                </div>
                <img className={style.teamimg} src={team.imagelink} />
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
