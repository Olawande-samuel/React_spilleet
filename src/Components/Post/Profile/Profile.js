import React from "react";
import { Link } from "react-router-dom";
import Styles from "../../../styles/Profile.module.css";
const Profile = ({ img, item }) => {
  return (
    <Link
      to={
        item ? `/user/profile/${item.username}-${item.usertoken}` : "/posts"
      }
    >
      <div className={Styles.profileWrapper}>
        <img
          src={`${img}`}
          alt="profile"
          width={57}
          height={57}
          className={Styles.image}
        />
      </div>
    </Link>
  );
};

export default Profile;
