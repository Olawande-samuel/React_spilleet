import { Stack, Box } from "@mui/material";
import Styles from "../../styles/Imageholder.module.css";
import Bars from "./Bars";
import Images from "./Images";
import { Link } from "react-router-dom";
import React from "react";
import Logo from "../../images/Logo2.png";
const Imageholder = () => {
  return (
    <Stack className={Styles.body}>
      <Box className={Styles.imgWrapper} height="50%">
        <Link to="/">
          <img src={Logo} alt="App Logo" width={160} height={48} />
        </Link>
        <Box display="grid" placeItems="center" marginTop="43px">
          <Bars />
        </Box>
      </Box>
      <Box>
        <Images />
      </Box>
    </Stack>
  );
};

export default Imageholder;
