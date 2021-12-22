import style from "./style.module.css";
import react from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Games(props) {
  const goTo = useNavigate();
  const pot = window.localStorage.getItem("pot");
  var url = "";
  useEffect(() => {
    const pot = window.localStorage.getItem("pot");
    console.log("p", pot);
    if (pot == "true") {
      url = "/TeamByGame";
      console.log(url);
    } else {
      url = "/PlayersByGame";
    }
  }, []);
  const { setShowNavbar } = props;
  setShowNavbar(true);

  return (
    <div>
      <div class={style.title1}>
        <h2>Chose Your Game</h2>
      </div>
      <div class={style.gamebox}>
        <div
          onClick={() => {
            goTo(url);
            props.setGame("r6");
          }}
          class={`${style.innergame} ${style.r6tab}`}
        >
          <div class={style.title}>
            <a href="/Teams">Rainbow Six</a>
          </div>
        </div>
      </div>
      <div class={style.gamebox}>
        <div
          onClick={() => {
            goTo(url);
            props.setGame("valorant");
          }}
          class={`${style.innergame} ${style.valotab}`}
        >
          <div class={style.title}>
            <a href="/Teams">Valorant</a>
          </div>
        </div>
      </div>
      <div class={style.gamebox}>
        <div
          onClick={() => {
            goTo(url);
            props.setGame("rl");
          }}
          class={`${style.innergame} ${style.rockettab}`}
        >
          <div class={style.title}>
            <a href="/Teams">Rocket League</a>
          </div>
        </div>
      </div>
      <div class={style.gamebox}>
        <div
          onClick={() => {
            goTo(url);
            props.setGame("apex");
          }}
          class={`${style.innergame} ${style.apextab}`}
        >
          <div class={style.title}>
            <a href="/Teams">Apex Legend</a>
          </div>
        </div>
      </div>
      <div class={style.gamebox}>
        <div
          onClick={() => {
            goTo(url);
            props.setGame("lol");
          }}
          class={`${style.innergame} ${style.loltab}`}
        >
          <div class={style.title}>
            <a href="/Teams">League of Legend</a>
          </div>
        </div>
      </div>
      <div class={style.gamebox}>
        <div
          onClick={() => {
            goTo(url);
            props.setGame("csgo");
          }}
          class={`${style.innergame} ${style.cstab}`}
        >
          <div class={style.title}>
            <a href="/Teams">Cs-Go</a>
          </div>
        </div>
      </div>
      <div class={style.gamebox}>
        <div
          onClick={() => {
            goTo(url);
            props.setGame("pubg");
          }}
          class={`${style.innergame} ${style.pubgtab}`}
        >
          <div class={style.title}>
            <a href="/Teams">Pubg</a>
          </div>
        </div>
      </div>
      <div class={style.gamebox}>
        <div
          onClick={() => {
            goTo(url);
            props.setGame("dota2");
          }}
          class={`${style.innergame} ${style.dota2tab}`}
        >
          <div class={style.title}>
            <a href="/Teams">Dota2</a>
          </div>
        </div>
      </div>
      <div class={style.gamebox}>
        <div
          onClick={() => {
            goTo(url);
            props.setGame("ow");
          }}
          class={`${style.innergame} ${style.overtab}`}
        >
          <div class={style.title}>
            <a href="/Teams">Overwatch</a>
          </div>
        </div>
      </div>
      <div class={style.gamebox}>
        <div
          onClick={() => {
            goTo(url);
            props.setGame("brawlhalla");
          }}
          class={`${style.innergame} ${style.brawtab}`}
        >
          <div class={style.title}>
            <a href="/Teams">Brawllhalla</a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Games;
