import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import style from "../../styles/Footer.module.css";

const FLinks = () => {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={7}
      justifyContent="space-between"
      alignItems="flex-end"
      sx={{ color: "#fff", paddingBottom: "5px" }}
      className={style.fLinks}
    >
      <Box display="flex" justifyContent="center">
        <Link to="/">
          <p>Terms &amp; Conditions</p>
        </Link>
      </Box>
      <Box display="flex" justifyContent="center">
        <Link to="/">
          <p>Pivacy Policy</p>
        </Link>
      </Box>
      <Box item display="flex" justifyContent="center">
        <Link to="/">
          <p>Help &amp; FAQ</p>
        </Link>
      </Box>
      <Box item display="flex" justifyContent="center">
        <Link to="/">
          <p> Contact us</p>
        </Link>
      </Box>
    </Box>
  );
};

export default FLinks;
