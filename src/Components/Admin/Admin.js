// @ts-nocheck
import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Style from "../../styles/Manage.module.css";
import Logo from "../../images/Logo2.png";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Admin = ({ children }) => {
  const [sidebar, setShowSidebar] = useState(false);
  const router = useNavigate();

  if (typeof window !== "undefined") {
    const closeSideBar = () => {
      setShowSidebar(false);
    };
    const showSidebar = () => {
      setShowSidebar(true);
    };

    const handleLogout = () => {
      localStorage.clear();
      router("/admin/login");
    };
    return (
      <Box className={Style.layout} minHeight="100vh">
        <Box className={Style.layout_header}>
          <Header showSidebar={showSidebar} />
        </Box>
        <Box className={Style.layout_sidebar}>
          <Sidebar />
        </Box>
        <Box className={Style.layout_main}>{children}</Box>
        <Box
          className={Style.smallSidebar}
          left={sidebar === true ? "0" : "-300%"}
        >
          <Box width="100%">
            <Box
              width="100%"
              mb={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <img src={Logo} alt="App Logo" width={154} height={106} />
            </Box>
            <Sidebar />
          </Box>
          <Box position="absolute" right="-30px">
            <i
              style={{ fontSize: "24px", color: "white" }}
              onClick={closeSideBar}
            >
              <AiOutlineClose />
            </i>
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{ width: "100%", background: "red", fontWeight: "700" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
  return null;
};

export default Admin;
