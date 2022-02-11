import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Styles from "../../../styles/Profile.module.css";

const FollowerImage = ({ photo }) => {
  return (
    // <Link to={ item ? `/user/profile/${item.username}-${item.usertoken}` : "/user/profile" } >
    <div className={Styles.profileWrapper}>
      <img
        src={photo}
        alt="profile"
        width={57}
        height={57}
        className={Styles.image}
      />
    </div>
    // </Link>
  );
};

export default FollowerImage;
