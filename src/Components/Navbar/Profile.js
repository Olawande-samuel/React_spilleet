import React, { useState, useEffect } from "react";
import Styles from "../../styles/Profile.module.css";
import { Link } from "react-router-dom";
import { Fetch } from "../../Trials/Controller";
import Placeholder from "../../images/placeholder.png";
const Profile = ({ img }) => {
  const [data, setData] = useState([]);
  const [image, setimage] = useState(null);

  const getUserData = () => {
    const access = localStorage.getItem("Spilleet_user");
    if (access) {
      const useable = JSON.parse(access);

      const formData = new FormData();
      formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
      formData.append("usertoken", useable.usertoken);
      Fetch(`${process.env.REACT_APP_END_POINT}/getUserData`, formData)
        .then((res) => {
          setData(res.data);
          setimage(res.data.imgurl);
          localStorage.setItem("deets", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  const access = localStorage.getItem("Spilleet_user");
  if (access || image) {
    return (
      <Link to={`/user/profile/${data.fullname}-${data.usertoken}`}>
        <div className={Styles.profileWrapper}>
         { image ? 
          <img
            src={image}
            alt="profile"
            className={Styles.image}
          />
           :
           <img
            src={Placeholder}
            alt="profile"
            className={Styles.image}
          />}

        </div>
      </Link>
    );
  }
  return null;
};

export default Profile;
