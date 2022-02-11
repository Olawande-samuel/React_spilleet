import { Box } from "@mui/material";
import React from "react";
import Profile from "../Post/Profile/Profile";
import Style from "../../styles/UserProfile.module.css";
import ProfileImage from "./ProfileImage";

const ProfileImg = ({picture}) => {

  return  (
      <Box className={Style.imgWrapper}>
        {picture  === "0"  || picture === undefined ? (
          <ProfileImage picture={"placeholder.png"} />
          ):(
          <img src={`${picture}`} alt="user profile" width={124} height={124} style={{borderRadius:"50%"}} />
        )}
      </Box>
    );
  
};

export default ProfileImg;
