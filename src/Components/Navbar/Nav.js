import React, { useEffect, useState, useContext } from "react";
import Btn from "./Button";
import Profile from "./Profile";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import Notification from "./Notification";
import Searchh from "./Search";
import Navbar from "../../styles/Nav.module.css";
import { Grid, useTheme, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Sidebar from "./SideBar/Sidebar";
import SearchNav from "./SearchNav";
import { SearchContext, SidebarContext } from "../Auth/User";

const Nav = ({ setValue }) => {
  const [search, setSearch] = useContext(SearchContext);
  const [showSearch, setShowSearch] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("Spilleet_user");
    if (data) {
      const user = JSON.parse(data);
      setUserObj(data);
    }
  }, []);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("990px"));

  const openSearch = () => {
    setShowSearch(true);
  };
  const handleClose = () => {
    setSearch("");
    setShowSearch(false);
  };
  const [showSidebar, setShowSidebar] = useContext(SidebarContext);

  const handleClick = () => {
    setShowSidebar(false);
  };
  return (
    <>
      <Grid container className={Navbar.nav}>
        {!showSearch ? (
          <>
            <Grid md={matches ? 8 : 5} item className={Navbar.left}>
              <Logo />
              <NavLinks />
            </Grid>
            <Grid md={matches ? 4 : 7} item className={Navbar.right}>
              <Searchh />
              <div className={Navbar.mobile}>
                <Logo />
              </div>
              <Notification />
              <Box className={Navbar.desktop}>
                <Btn />
                <Profile />
              </Box>
              {userObj ? (
                <Box className={Navbar.mobile} alignItems="center" gap={1}>
                  <Searchh setValue={setValue} handleClick={openSearch} />
                  <Profile />
                </Box>
              ) : (
                <Box className={Navbar.mobile} alignItems="center" gap={1}>
                  <Btn />
                </Box>
              )}
            </Grid>
          </>
        ) : (
          <SearchNav handleClose={handleClose} />
        )}
      </Grid>
      {showSidebar && <Sidebar handleClick={handleClick} />}
    </>
  );
};

export default Nav;
