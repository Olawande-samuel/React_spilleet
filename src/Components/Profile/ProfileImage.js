import { Box } from "@mui/material";
import React from "react";
import Style from "../../styles/UserProfile.module.css";
import Placeholder from "../../images/placeholder.png"
const ProfileImage = ({img}) => {
        return  (
          <Box className={Style.imgWrapper}>
            <img src={img === undefined ? Placeholder:img.photo} alt="user profile" width={124} height={124} />
          </Box>
        );
     
};

export default ProfileImage;