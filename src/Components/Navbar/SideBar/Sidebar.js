import { Stack, Box, Divider } from "@mui/material";
import ProfileImg from "../../Profile/ProfileImg";
import { useNavigate, Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import style from "../../../styles/Sidebar.module.css";
import { Context } from "../../../Trials/Controller";

const Sidebar = ({ handleClick }) => {
    const { NavLinks } = useContext(Context);
  const [user, setUser] = useState({});
    const router = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const uData = JSON.parse(data);
      setUser(uData);
    }
  }, []);
  const logout = () => {
    localStorage.clear();
    handleClick();
    router("/");
    window.location.reload();
  };
  const signup = () => {
    handleClick();
    router("/login");
  };
  return (
    <Box
      display="flex"
      position="fixed"
      left="0"
      top="0"
      bottom="0"
      height="100vh"
      width="100%"
      zIndex="2000"
    >
      <Stack spacing={3} width="50%" height="100%" backgroundColor="#C035A2">
        <Box display="flex" justifyContent="center" width="100%">
          <Link to={user && `/user/profile/${user.fullname}-${user.usertoken}`}>
            <ProfileImg picture={user.photo} />
          </Link>
        </Box>
        <Divider />
        <Box>
          <Stack className={style.links}>
            {NavLinks.length > 0 &&
              NavLinks.map((item) => (
                <Link
                  style={{
                    padding: "1rem 0",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  to={
                    item.title === "Profile"
                      ? user
                        ? `${item.link}/${user.fullname}-${user.usertoken}`
                        : "/login"
                      : item.link
                  }
                  key={item.id}
                >
                  <Box onClick={handleClick}>
                    <p className={style.link}>{item.title}</p>
                  </Box>
                  <Divider />
                </Link>
              ))}
            <Link
              to="/user/notifications"
              style={{
                padding: "1rem 0",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box onClick={handleClick}>
                <Box className={style.link}>Notifications</Box>
                {/* <Divider /> */}
              </Box>
            </Link>
          </Stack>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="center">
          {Object.keys(user).length > 0 ? (
            <button className={style.btn} onClick={logout}>
              Logout
            </button>
          ) : (
            <button className={style.btn} onClick={signup}>
              Sign in
            </button>
          )}
        </Box>
      </Stack>
      <Box
        width="50%"
        height="100vh"
        backgroundColor="rgba(155, 155, 155, 0.94)"
        onClick={handleClick}
      ></Box>
    </Box>
  );
};

export default Sidebar;
