import React from "react";
import style from "./style.module.css";

export default function Teams(props) {
  //set navbar to shown on this page

  let teamsArr = {
    team1: {
      teamname: "Cloud 9",
      imagelink:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Cloud9_logo.svg/1200px-Cloud9_logo.svg.png",
      description:
        "We are the best north american team in League of legends and in Rocket league",
      game: "League Of Legends",
    },
    team2: {
      teamname: "Team Solo Mid",
      imagelink:
        "https://pbs.twimg.com/profile_images/1452652003474214921/zotbpP_C_400x400.jpg",
      description:
        "We are the better Org by far in North america and even in the whole world",
      game: "Rocket League",
    },
  };

  return (
    <main>
      <div className={style.title}>Teams</div>
      <div className={style.teams}>
        {Object.keys(teamsArr).map((key) => {
          let team = teamsArr[key];
          return (
            <div className={style.team}>
              <div className={style.text}>
                <h3>{team.teamname}</h3>
                <p className={style.description}>{team.description}</p>
              </div>
              <img className={style.teamimg} src={team.imagelink} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
