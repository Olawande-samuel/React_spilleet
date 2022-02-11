import BasicTabs from "./Tabs";
import { Box } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import React from "react"
const Mid = ({data}) => {
  return (
    <Box
      minHeight="80vh"
      display="flex"
      justifyContent="center"
      // alignItems="center"
    >
      <BasicTabs  data={data} />
    </Box>
  );
};

export default Mid;
