import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { PSidebarData } from "./PSidebarData";
import { TSidebarData } from "./TSidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
var check = false;
function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [SideBarData, setSideBarData] = useState(null);
  const goTo = useNavigate();
  const showSidebar = () => setSidebar(!sidebar);
  useEffect(() => {
    const pot = window.localStorage.getItem("pot");
    console.log("p", pot);
    if (pot == "false") {
      check = false;
    } else {
      check = true;
    }
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {(check ? PSidebarData : TSidebarData).map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li
              className="nav-text"
              onClick={(e) => {
                localStorage.removeItem("access_token");
                goTo("/");
              }}
            >
              <Link to="#">
                <AiIcons.AiOutlineLogout />
                <span className="test">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
// if (pot == "false") {
//   check = false
// } else {
//   check = true
