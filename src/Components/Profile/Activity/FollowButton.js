import { FiUserPlus } from "react-icons/fi";
import Style from "../../../styles/Follower.module.css";
import { useState, useEffect } from "react";
import React, { Fetch } from "../../../Trials/Controller";
import { BsFillCheckCircleFill } from "react-icons/bs";
const FollowButton = ({ item }) => {
  const [username, setUsername] = useState("");
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);
      setUsername(user.usertoken);
    }
  }, []);

  const handleClick = (token) => {
    setFollowing(!following);
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    formData.append("to_follow", token);
    formData.append("usertoken", username);
    Fetch(`${process.env.REACT_APP_END_POINT}/follow`, formData)
      .then((res) => {
        if (res.data.success === false) {
          window.alert(res.message);
        }
      })
      .catch((err) => {
        window.alert(err.message);
      });
  };

  return (
    <button
      className={Style.followButton}
      type="submit"
      onClick={() => handleClick(item.followed_token || item.follower_token)}
    >
      {following ? (
        <span>
          <BsFillCheckCircleFill />
        </span>
      ) : (
        <>
          <span>
            <FiUserPlus />
          </span>
          <span className={Style.followText}>Follow</span>
        </>
      )}
    </button>
  );
};

export default FollowButton;
