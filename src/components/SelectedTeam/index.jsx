import style from "./style.module.css"
function SelectedTeam(props) {
    let teams = {
        teamname: "Cloud 9",
        imagelink:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Cloud9_logo.svg/1200px-Cloud9_logo.svg.png",
        description:
            "We are the best north american team in League of legends and in R6",
        requirements: {
            age: "18 and above",
            rank: "gold",
        },
        game: "r6",
    }


    return <div>
        < div className={style.teamNum} >
            <h2 className={style.title}>Team #1</h2>
        </ div>
        <div className={style.teamDiv}>
            <div className={style.upper}>

                <div className={style.textDiv}>
                    <h1 className={style.Name}> {teams.teamname}</h1>
                    <p className={style.description}>About {teams.teamname}:{teams.description}</p>
                    <h3>Requirement:</h3>
                    <ul className={style.requirements}>
                        {Object.keys(teams.requirements).map((key) => {
                            return <li>{`${key}: ${teams.requirements[key]}`}</li>
                        })}
                    </ul>
                </div>

                <img src={teams.imagelink} alt="logo" className={style.img} />
            </div>
            <div className={style.buttons}>

                <button className={style.backButton}>Back</button>
                <button className={style.sendResumeButton}>Send Resume</button>
            </div>
        </div>
    </div >
}


export default SelectedTeam