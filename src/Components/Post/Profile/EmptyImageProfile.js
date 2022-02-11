import React from "react";
import { Link } from "react-router-dom";
import Styles from "../../../styles/Profile.module.css";
import Placeholder from "../../../images/placeholder.png"
const EmptyImageProfile = ({ item }) => {
  return (
    <Link
      to={
        Object.keys(item).length > 0
          ? `/user/profile/${item.username + "-" + item.usertoken}`
          : "/user/profile"
      }
    >
      <div className={Styles.profileWrapper}>
        <img
          src={Placeholder}
          alt="profile"
          width={57}
          height={57}
          className={Styles.image}
        />
      </div>
    </Link>
  );
};

export default EmptyImageProfile;
