import style from "./style.module.css"
import {useNavigate} from "react-router-dom"
function Home(props){
    const goTo = useNavigate()
        return <div>
            <button onClick={()=>{
                goTo("/about")
            }}></button>
            <h1 className={style.title}>Home page</h1>
        </div>}
        
    
export default Home