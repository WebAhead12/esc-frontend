import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as GiIcons from "react-icons/gi";
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";

export const TSidebarData = [
  {
    title: "Profile",
    path: "/profile",
    icon: <AiIcons.AiFillProfile />,
    cName: "nav-text",
  },
  {
    title: "Players",
    path: "/players",
    icon: <GiIcons.GiPlayerBase />,
    cName: "nav-text",
  },
  {
    title: "Requests",
    path: "/requests",
    icon: <FaIcons.FaFileAlt />,
    cName: "nav-text",
  },
  {
    title: "Games",
    path: "/games",
    icon: <GiIcons.GiGamepad />,
    cName: "nav-text",
  },
];
