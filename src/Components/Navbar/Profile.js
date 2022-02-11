import React, { useState, useEffect } from "react";
import Styles from "../../styles/Profile.module.css";
import { Link } from "react-router-dom";
import { Fetch } from "../../Trials/Controller";
import Placeholder from "../../images/placeholder.png";
const Profile = ({ img }) => {
  const [data, setData] = useState([]);
  const [image, setimage] = useState(null);
  useEffect(() => {
    const access = localStorage.getItem("user");
    if (access) {
      const useable = JSON.parse(access);

      const formData = new FormData();
      formData.append("apptoken", "7FHS8S43N2JF08");
      formData.append("usertoken", useable.usertoken);
      Fetch("https://spilleetapi.spilleet.com/getUserData", formData)
        .then((res) => {
          setData(res.data);
          setimage(res.data.imgurl);
          localStorage.setItem("deets", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);
  const access = localStorage.getItem("user");
  if (access) {
    return (
      <Link to={`/user/profile/${data.fullname}-${data.usertoken}`}>
        <div className={Styles.profileWrapper}>
          <img
            src={image ? image : Placeholder}
            alt="profile"
            className={Styles.image}
          />
        </div>
      </Link>
    );
  }
  return null;
};

export default Profile;
