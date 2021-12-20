import style from "./style.module.css";

function About(props) {
  const { setShowNavbar } = props;
  setShowNavbar(true);
  return <h1 className={style.title}>About page</h1>;
}
export default About;
