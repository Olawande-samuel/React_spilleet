import { Grid, Icon, Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
// import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import style from "../../styles/Footer.module.css";
import { FiFacebook } from "react-icons/fi";
import { Link } from "react-router-dom";
const SocialSignin = () => {
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("Spilleet_user");

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
              color: "#C035A2",
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
              color: "#C035A2",
            }}
          >
            <FaInstagram />
          </i>
        </Box>
      </Box>
      {!userObj && (
        <Box item md={10} className={style.login}>
          <Link to="/login">
            <Button
              variant="outlined"
              border="1px solid #fff"
              className={style.login_btn}
              sx={{
                marginRight: "20px",
                border: "1px solid #fff",
                padding: "12px 57px",
                color: "#fff",
              }}
            >
              Log in
            </Button>
          </Link>

          <Link to="/signup">
            <Button
              sx={{
                backgroundColor: "#fff",
                padding: "12px 57px",
                color: " #C035A2",
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default SocialSignin;
