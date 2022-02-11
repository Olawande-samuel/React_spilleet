import { Stack, Box } from "@mui/material";
import FLinks from "../Footer/FLinks";
import React from "react";
import SocialSignin from "./SocialSignin";
import style from "../../styles/Footer.module.css";
const LogoSocial = () => {
  return (
    <Box
      spacing={3}
      height="100%"
      display="flex"
      // flexDirection="column"
      justifyContent="space-between"
      paddingBottom=".5rem"
      className={style.footerLogosocial}
      // border="1px solid red"
      gap="1rem"
      alignItems="center"
    >
      <SocialSignin />
    </Box>
  );
};

export default LogoSocial;
