import style from "./style.module.css"
import { useNavigate } from "react-router-dom"
function Register(props) {
    const goTo = useNavigate()
    return <div>
        <button onClick={() => {
            goTo("/")
        }}></button>
        <h1 className={style.title}>Register</h1>
    </div>
}


export default Register