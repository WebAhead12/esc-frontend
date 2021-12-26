import style from "./style.module.css";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { objectExpression } from "@babel/types";
// const api = "https://escbackend.herokuapp.com";

function Profile(props) {
  const goTo = useNavigate();

  const { setShowNavbar } = props;
  const [answer, setAnswer] = useState(false);
  const [pot, setPot] = useState(null);
  const [player, setPlayer] = useState(null);
  const [team, setTeam] = useState(null);
  const api = props.production
    ? "https://escbackend.herokuapp.com"
    : "http://localhost:4000";
  setShowNavbar(true);

  const games = {
    rl: "Rocket league",
    lol: "League of legends",
    csgo: "Coutner strike",
    apex: "Apex Legends",
    brawlhalla: "Brawlhalla",
    r6: "Rainbow six siege",
    pubg: "PUBG",
    ow: "Overwatch",
    dota2: "Dota 2",
    valorant: "Valorant",
  };

  React.useEffect(() => {
    if (pot !== null) {
      if (pot === "true") {
        let token = localStorage.getItem("access_token");
        let config = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
        axios.get(`${api}/playerProfile`, config).then((data) => {
          setPlayer(data.data[0]);
        });
      } else if (pot === "false") {
        let token = localStorage.getItem("access_token");
        let config = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
        axios.get(`${api}/teamProfile`, config).then((data) => {
          setTeam(data.data[0]);
        });
      }
    }
  }, [pot]);

  React.useEffect(() => {
    console.log(player);
  }, player);

  React.useEffect(() => {
    setPot(localStorage.getItem("pot"));
  }, []);

  return (
    <div>
      {player || team ? (
        <div className={style.playerDiv}>
          <div>
            <div className={style.teamDiv}>
              <div className={style.upper}>
                {pot === "true" ? (
                  <div className={style.textDiv}>
                    <h1 className={style.Name}> {player.username}</h1>
                    <p className={style.description}>
                      About {player.username}:<br />
                      Fullname: {player.firstname + " " + player.lastname}
                      <br />
                      Email: {player.email}
                      <br />
                      Location:{player.location}
                      <br />
                      languages:
                      {player.languages.replaceAll(/{|}|"/g, "")}
                      <br />
                      Date of birth:{player.age}
                      <br />
                      Registration Date :
                      {player.registerdate.replace(
                        player.registerdate.match(/T.+/g),
                        ""
                      )}
                    </p>
                    <div className={style.image}>
                      <img
                        src={player.imagelink}
                        alt="logo"
                        className={style.img}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={style.textDiv}>
                    <h1 className={style.Name}> {team.name}</h1>
                    <p className={style.description}>
                      About {team.teamname}:<br />
                      Description: {team.description}
                      <br />
                      Email: {team.email}
                      <br />
                      Game: {games[team.game]}
                      <br />
                      Requirements:
                      <ul>
                        {Object.keys(team.requirements).map((req) => {
                          return (
                            <li>
                              {req} : {team.requirements[req]}
                            </li>
                          );
                        })}
                      </ul>
                      <br />
                      Registration Date :
                      {team.registerdate.replace(
                        team.registerdate.match(/T.+/g),
                        ""
                      )}
                    </p>
                    <div className={style.image}>
                      <img
                        src={team.imagelink}
                        alt="logo"
                        className={style.img}
                      />
                    </div>
                  </div>
                )}
                {pot === "true" ? (
                  <div>
                    <h3> Stats </h3>
                    <ul className={style.stats}>
                      {Object.keys(player.stats).map((key) => {
                        if (player.stats[key] !== null) {
                          let temp = Object.keys(player.stats[key]).map(
                            (stat) => {
                              return (
                                <li>
                                  {stat}: {player.stats[key][stat]}
                                </li>
                              );
                            }
                          );
                          return (
                            <li>
                              {key}:<ul>{temp}</ul>
                            </li>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </ul>{" "}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default Profile;
