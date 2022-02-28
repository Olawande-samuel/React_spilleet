import { Box } from "@mui/material";
import React from "react";
import Style from "../../styles/Trending.module.css";
import Carousell from "./Carousel";
import Trends from "../../images/trendsarrow2.svg"
const Trending = () => {
  return (
    <Box  display="flex" flexDirection="column" alignItems="center">
      <Box className={Style.header} mb={2} alignSelf="flex-start" display="flex" justifyContent="flex-start" alignItems="center">
        <Box className={Style.logo} mr={2}>
          <img src={Trends} alt="" width={20} height={26} />
        </Box>
        <Box className={Style.title}>
          <p>Trending today </p>
        </Box>
      </Box>
      <Carousell />
    </Box>
  );
};

export default Trending;
