import { Box } from "@mui/material";
import style from "../../../styles/PostDetails.module.css";
import ActivityBar from "../ActivityBar/ActivityBar";
import Comment from "../Text/Comment";
import React, { useState, useEffect } from "react";
import { Fetch } from "../../../Trials/Controller";
import TextComment from "../Text/TextComment";
import Actions from "../Actions/Actions";

const WithImage = ({ post }) => {
  const [userObj, setUserObj] = useState(null);
  const [comments, setComments] = useState(false);
  const [reload, setReload] = useState(false);
  const [reloadComments, setReloadComments] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const handleShowComment = () => {
    setShowComments(!showComments);
  };
  useEffect(() => {
    const data = localStorage.getItem("Spilleet_user");

    if (data) setUserObj(data);
  }, []);
  useEffect(() => {
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    formData.append("cnt_id", post.cnt_id);
    Fetch(`${process.env.REACT_APP_END_POINT}/display-comments`, formData)
      .then((res) => {
        if (res.data.success !== false) {
          setComments(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [reload, post]);
  return (
    <Box className={style.post_container}>
      <Box className={style.header_wrapper} mb={1}>
        <div className={style.image_title_wrapper}>
          <h1
            className={style.title}
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <div className={style.author}>
            <span>by</span> {post.username}
          </div>
        </div>
      </Box>
      <Box>
        <div className={style.img_wrapper}>
          <img
            className={style.image}
            src={post.img_url}
            alt={post.title}
            layout="fill"
            // objectFit="contain"
          />
        </div>
      </Box>
      <Box className={style.content_wrapper}>
        <Box className={style.content}>
          <p
            className={style.body}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </Box>
      </Box>

      {userObj && (
        <Box className={style.comment_wrapper}>
          <Box className={style.comment} backgroundColor="#eee">
            <Actions item={post} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default WithImage;
