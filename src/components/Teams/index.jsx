import style from "./style.module.css";
import { useNavigate } from "react-router";
import useFetch from "../../fetch";

export default function Teams(props) {
  const {
    error,
    isPending,
    data: teams,
  } = useFetch("http://localhost:4000/teams");

  const goTo = useNavigate();

  return (
    <main>
      <div className={style.title}>Teams</div>
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
              <div className="teamPreview">
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
