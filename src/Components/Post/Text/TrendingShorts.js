import { Box, Typography } from "@mui/material";
import React from "react";
import Style from "../../../styles/Trending.module.css";
import { Link } from "react-router-dom";
const TrendingShorts = ({ item, key }) => {
  return (
      <Box
        className={Style.shorts}
        width="160px"
        display="flex"
        color="#fff"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="148px"
        border="1px solid #C035A2"
        padding="5px"
        borderRadius="4px"
      >
        <Typography
          className={Style.trendingTitle}
          variant="h6"
          textAlign="center"
        >
          {item.title}
        </Typography>
        <Typography textAlign="center" color="lightgrey" my={1}>
          by
        </Typography>
        <Typography lineHeight="15px" variant="subtitle1" textAlign="center" fontSize="14px">
          {item.username}
        </Typography>
      </Box>
  );
};

export default TrendingShorts;
