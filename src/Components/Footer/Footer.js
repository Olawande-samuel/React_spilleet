import { Box, Grid } from "@mui/material";
import React from "react";
import Copy from "./Copy";
import FLogo from "./FLogo";
import LogoSocial from "./LogoSocial";
import useMediaQuery from "@mui/material/useMediaQuery";
import Styles from "../../styles/Footer.module.css";
import FLinks from "./FLinks";
const Footer = () => {
  // const theme = useTheme();
  const matches = useMediaQuery("1014px");
  const mobile = useMediaQuery("480px");
  return (
    <footer style={{ background: "#171194" }}>
      <Box
        display="flex"
        flexWrap="wrap"
        // sx={{  minHeight: matches ? "109px" : "109px" }}
        // justifyContent={mobile ? "center" : "space-between"}
        paddingLeft="20px"
        paddingRight="20px"
        alignItems="center"
        className={Styles.footerContainer}
      >
        {/* <Box alignSelf="flex-start" md={2} className={Styles.items}>
          <FLogo />
        </Box> */}
        <Box
          item
          md={6}
          // sx={{ height: "107px" }}
          className={Styles.items}
          alignSelf="center"
        >
          <LogoSocial />
        </Box>
        <Box className={Styles.items}>
          <FLinks />
        </Box>
        <Box
          item
          // alignSelf="flex-end"
          fontSize="12px"
          lineHeight="13px"
          color="white"
          mb={2}
          md={2}
          // border="1px solid"
          className={Styles.copyWrapper}
        >
          <Copy />
        </Box>
      </Box>
    </footer>
  );
};
export default Footer;
