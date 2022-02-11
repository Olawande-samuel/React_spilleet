import { Box, Grid } from "@mui/material";
import Profile from "../../Post/Profile/Profile";
import Details from "./Details";
import FollowButton from "./FollowButton";
import Style from "../../../styles/Follower.module.css";
import FollowerImage from "./FollowerImage";
import React from "react"
const Follower = ({ item }) => {
  return (
    <Grid container padding="10px 5px" borderBottom="0.234px solid gray" justifyContent="space-between" alignItems="center" >
      <Grid item xs={2} display="flex" justifyContent="center">
        {item.photo === "0"? (
          <FollowerImage photo={"/placeholder.png"} />
        ) : (
          <FollowerImage photo={item.photo} />
        )}
      </Grid>
      <Grid
        item
        xs={9}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Details item={item} />
        {item.follower_name && <FollowButton item={item} />
        }
      </Grid>
    </Grid>
  );
};

export default Follower;
