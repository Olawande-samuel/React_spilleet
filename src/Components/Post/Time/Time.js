import { Grid } from "@mui/material";
import React from "react";

const Time = ({time}) => {
  return (
    <Grid justifyContent="flex-end" container>
      <Grid
        item
        sx={{
          fontSize: "12.049px",
          lineHeight: "14px",
          color: "rgba(0, 0, 0, 0.58)",
        }}
      >
        {time} <span>ago</span>
      </Grid>
    </Grid>
  );
};

export default Time;
