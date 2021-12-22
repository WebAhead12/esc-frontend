import style from "./style.module.css";
import axios from "axios";
import React from "react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Profile(props) {
    const goTo = useNavigate();

    const token = window.localStorage.getItem("access_token");
    const { setShowNavbar } = props;
    const [answer, setAnswer] = useState(false);
    const [pot, setPot] = useState(null)
    const [player, setPlayer] = useState(null)
    const [team, setTeam] = useState(null)
    setShowNavbar(true);

    React.useEffect(() => {
        if (pot !== null) {
            if (pot === "true") {
                let token = localStorage.getItem("access_token")
                let config = {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                }
                axios
                    .get("http://localhost:4000/playerProfile", config)
                    .then(data => {
                        console.log(data.data[0])
                        setPlayer(data.data[0]);
                    })

            }
            else {
                let token = localStorage.getItem("access_token")
                let config = {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                }
                axios
                    .get("http://localhost:4000/teamProfile", config)
                    .then(data => {
                        console.log(data.data[0])
                        setTeam(data.data[0]);

                    })
            }
        }
    }, [pot])

    React.useEffect(() => {
        setPot(localStorage.getItem("pot"))
    }, [])



    return (
        <div>

            {player ?
                < div className={style.playerDiv} >
                    <div>
                        <div className={style.teamDiv}>
                            <div className={style.upper}>
                                {pot ? (
                                    <div className={style.textDiv}>
                                        <h1 className={style.Name}> {player.username}</h1>
                                        <p className={style.description}>
                                            About {player.username}:<br />
                                            Fullname: {player.firstname + " " + player.lastname}<br />
                                            Email: {player.email}<br />
                                            Location:{player.location}<br />
                                            languages:{player.languages}<br />
                                            Date:{player.age}<br />
                                            Registration Data :{player.registerdate.replace(player.registerdate.match(/T.+/g), "")}

                                        </p>
                                    </div>
                                ) : (
                                    <div className={style.textDiv}>
                                        <h1 className={style.Name}> {team.username}</h1>
                                        <p className={style.description}>
                                            About {team.username}:<br />
                                            Fullname: {team.firstname + " " + team.lastname}<br />
                                            Email: {team.email}<br />
                                            Location:{team.location}<br />
                                            languages:{team.languages}<br />
                                            Date:{team.age}<br />
                                            Registration Data :{team.registerdate.replace(team.registerdate.match(/T.+/g), "")}

                                        </p>
                                    </div>
                                )}
                                <div className={style.image}>
                                    <img src={player.imagelink} alt="logo" className={style.img} />
                                </div>
                            </div>
                        </div>
                    </div>
                </ div > : "Loading"}

        </div>
    );
}

export default Profile;