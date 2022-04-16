import React, { useContext, useState, useEffect } from "react";
import Style from "../../../styles/ImagePost.module.css";
import Styles from "../../../styles/NameFollow.module.css";
import ActivityBar from "../ActivityBar/ActivityBar";
import Time from "../Time/Time";
import TextComment from "../Text/TextComment";
import { Context, Fetch } from "../../../Trials/Controller";
import { Link } from "react-router-dom";
import Comment from "../Text/Comment";
import { Box } from "@mui/material";

const ImagePost = ({ item, reloader, key, profile }) => {
  const [comments, setComments] = useState(false);
  const [reload, setReload] = useState(false);
  const [reloadComments, setReloadComments] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [following, setFollowing] = useState("");
  const [username, setUsername] = useState(null);

  const handleShowComment = () => {
    setShowComments(!showComments);
  };

  useEffect(() => {
    if (item) {
      setFollowing(item.following);
      const formData = new FormData();
      formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
      formData.append("cnt_id", item.cnt_id);
      Fetch(`${process.env.REACT_APP_END_POINT}/display-comments`, formData)
        .then((res) => {
          if (res.data.success !== false) {
            setComments(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [reload, item]);

  useEffect(() => {
    const data = localStorage.getItem("Spilleet_user");
    if (data) {
      const user = JSON.parse(data);
      setUsername(user.usertoken);
    }
  }, []);

  const handleSubmit = () => {
    setFollowing("Yes");
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    formData.append("to_follow", item.usertoken);
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
    formData.append("to_follow", item.usertoken);
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
  return (
    item !== undefined && (
      <div
        className={profile ? Style.profile_container : Style.container}
        key={key}
      >
        <div className={Style.content} style={{ position: "relative" }}>
          <Link to={`/posts/${item.cnt_id}`}>
            <div
              className={Style.imageContainer}
              style={{
                backgroundImage: `url(${item.image_url}),linear-gradient(0deg, #000000 -11.77%, rgba(0, 0, 0, 0) 100%)`,
                backgroundRepeat: "no-repeat",
                backgroundBlendMode: "multiply",
                backgroundSize: "cover",
                backgroundPosition: "top center",
              }}
            >
              <div className={Style.title}>
                <h1>{item.title}</h1>
                <p>posted by {item.username}</p>
              </div>
            </div>
          </Link>
          <span
            style={{
              position: "absolute",
              color: "#fff",
              zIndex: "2001",
              bottom: "40px",
              left: "15px",
            }}
          >
            {username &&
              username !== item.usertoken &&
              (following === "Yes" ? (
                <Box display="flex">
                  <p className={Styles.follow} onClick={handleUnfollow}>
                    Following
                  </p>
                </Box>
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <p className={Styles.follow} onClick={handleSubmit}>
                    Follow
                  </p>
                </Box>
              ))}
          </span>
          <ActivityBar
            reloadComments={reloadComments}
            item={item}
            likes={item.likes}
            comment={item.comments}
            handleShowComment={handleShowComment}
          />

          {showComments === true && (
            <Comment
              item={item}
              setReload={setReload}
              setShowComments={setShowComments}
              reloadComments={setReloadComments}
            />
          )}
          {showComments === true && comments.length > 0 && (
            <Box
              border="1px solid lightgrey"
              borderTop="none"
              maxHeight="300px"
              overflow="scroll"
              paddingBottom="4px"
            >
              <>
                <Box>
                  {comments.map((item) => (
                    <TextComment key={item.id} item={item} />
                  ))}
                </Box>
              </>
            </Box>
          )}
        </div>
        <Time time={item.timeago} />
      </div>
    )
  );
};

export default ImagePost;
