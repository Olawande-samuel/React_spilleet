import { Box, Stack } from "@mui/material";
import React from "react";
import Styles from "../../../styles/NameFollow.module.css";
import { useState, useEffect } from "react";
import { Fetch } from "../../../Trials/Controller";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import EditModal from "../Text/EditModal";

const NameFollow = ({ user, date, usertoken, followed, item }) => {
  const [username, setUsername] = useState(null);
  const [following, setFollowing] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("Spilleet_user");
    if (data) {
      const user = JSON.parse(data);
      setUsername(user.usertoken);
    }
    setFollowing(followed);
  }, []);

  const handleSubmit = () => {
    setFollowing("Yes");
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    formData.append("to_follow", usertoken);
    formData.append("usertoken", username);
    Fetch(`${process.env.REACT_APP_END_POINT}/follow`, formData)
      .then((res) => {
        if (res.data.success === false) {
          window.alert(res.data.message);
        } else {
          return;
        }
      })
      .catch((err) => {
        window.alert(err.message);
      });
  };
  const handleUnfollow = () => {
    setFollowing("No");
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    formData.append("to_follow", usertoken);
    formData.append("usertoken", username);
    Fetch(`${process.env.REACT_APP_END_POINT}/unfollow`, formData)
      .then((res) => {
        if (res.data.success === false) {
          window.alert(res.data.message);
        } else {
          return;
        }
      })
      .catch((err) => {
        window.alert(err.message);
      });
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <Stack spacing={1}>
      <Box className={Styles.wrapper}>
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Link
            to={
              item
                ? `/user/profile/${item.username}-${item.usertoken}`
                : "/posts"
            }
          >
            <p className={Styles.name}>{user}</p>
          </Link>

          {username &&
            username !== usertoken &&
            (following === "Yes" ? (
              <>
                <div className={Styles.dot}></div>
                <p className={Styles.follow} onClick={handleUnfollow}>
                  Following
                </p>
              </>
            ) : (
              <>
                <div className={Styles.dot}></div>
                <p className={Styles.follow} onClick={handleSubmit}>
                  Follow
                </p>
              </>
            ))}
        </Box>
        {/* <i style={{justifySelf:"flex-end"}} onClick={handleOpen}><BsThreeDotsVertical /></i> */}
      </Box>
      <Box sx={{ marginTop: "3px !important" }}>
        <small onClick={handleSubmit} className={Styles.time}>
          Updated <span>{date}</span> ago
        </small>
      </Box>
    </Stack>
  );
};

export default NameFollow;
