import style from "./style.module.css";
import { useNavigate } from "react-router-dom"
function SelectedPlayer(props) {
    //set navbar to shown on this page
    const { setShowNavbar } = props;
    setShowNavbar(true);
    let gamer = {
        username: "Karyum",
        imagelink:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Cloud9_logo.svg/1200px-Cloud9_logo.svg.png",
        description:
            "We are the best north american player in League of legends and in Rocket league",
        game: "League Of Legends",
    }
    const goTo = useNavigate()
    return (
        <div>
            <div className={style.teamDiv}>
                <div className={style.upper}>
                    <div className={style.textDiv}>
                        <h1 className={style.Name}> {gamer.username}</h1>
                        <p className={style.description}>
                            About {gamer.username}:{gamer.description}
                        </p>
                        <h3>Game:<h6>{gamer.game}</h6> </h3>
                    </div>

                    <img src={gamer.imagelink} alt="logo" className={style.img} />
                </div>
                <div className={style.buttons}>
                    <button className={style.backButton} onClick={() => { goTo("/Players") }}>Back</button>
                    <button className={style.sendResumeButton}>Invite</button>
                </div>
            </div>
        </div>
    );
}

export default SelectedPlayer;
