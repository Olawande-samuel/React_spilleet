import { Box } from "@mui/system";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../Trials/Controller";
import { NavLink } from "react-router-dom";
import Style from "../../styles/Nav.module.css";
import { BiMenu } from "react-icons/bi";
import { SidebarContext } from "../Auth/User";
const NavLinks = () => {
  const { NavLinks } = useContext(Context);
  const [showSidebar, setShowSidebar] = useContext(SidebarContext);
  const [userData, setUserData] = useState({});

  const openSidebar = () => {
    setShowSidebar(true);
  };

  useEffect(() => {
    const data = localStorage.getItem("Spilleet_user");
    if (data) {
      const user = JSON.parse(data);
      setUserData(user);
    }
  }, []);
  return (
    <Box className={Style.wrapper}>
      <Box className={Style.linksWrapper}>
        {NavLinks.length > 0 &&
          NavLinks.map((item) => (
            <NavLink
              to={
                item.title === "Profile"
                  ? userData
                    ? `${item.link}/${userData.fullname}-${userData.usertoken}`
                    : "/login"
                  : item.link
              }
              key={item.id}
            >
              <p className={Style.link}>{item.title}</p>
            </NavLink>
          ))}
      </Box>
      <Box className={Style.hamburger}>
        <BiMenu onClick={openSidebar} />
      </Box>
    </Box>
  );
};

export default NavLinks;
