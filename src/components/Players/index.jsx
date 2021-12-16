import React from "react";
import style from "./style.module.css";

export default function Players(props) {
  //set navbar to shown on this page

  let playersArr = {
    player1: {
      username: "Karyum",
      imagelink:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Cloud9_logo.svg/1200px-Cloud9_logo.svg.png",
      description:
        "We are the best north american player in League of legends and in Rocket league",
      game: "League Of Legends",
    },
    player2: {
      username: "player Solo Mid",
      imagelink: "https://avatars.githubusercontent.com/u/24195641?v=4",
      description:
        "We are the better Org by far in North america and even in the whole world",
      game: "Rocket League",
    },
  };

  return (
    <main>
      <div className={style.title}>players</div>
      <div className={style.players}>
        {Object.keys(playersArr).map((key) => {
          let player = playersArr[key];
          return (
            <div className={style.player}>
              <div className={style.text}>
                <h3>{player.username}</h3>
                <p className={style.description}>{player.description}</p>
              </div>
              <img className={style.playerimg} src={player.imagelink} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
