import { Grid, Icon, Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
// import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import style from "../../styles/Footer.module.css";
import { FiFacebook } from "react-icons/fi";
const SocialSignin = () => {
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data) setUserObj(data);
  }, []);

  return (
    <Box
      paddingTop="1rem"
      display="flex"
      gap={2}
      flexWrap="wrap"
      justifyContent="flex-end"
    >
      <Box
        item
        md={2}
        gap={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <i
            style={{
              background: "#fff",
              width: "34px",
              height: "34px",
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              fontSize: "24px",
              color: "#171194",
            }}
          >
            <FiFacebook />
          </i>
        </Box>
        <Box>
          <i
            style={{
              background: "#fff",
              width: "34px",
              height: "34px",
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              fontSize: "24px",
              color: "#171194",
            }}
          >
            <FaInstagram />
          </i>
        </Box>
      </Box>
      {!userObj && (
        <Box item md={10} className={style.login}>
          <Button
            variant="outlined"
            sx={{ marginRight: "20px", padding: "12px 57px", color: "#fff" }}
          >
            Log in
          </Button>
          <Button
            sx={{
              backgroundColor: "#2B6AD0",
              padding: "12px 57px",
              color: "#fff",
            }}
          >
            Sign Up
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SocialSignin;
