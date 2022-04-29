import { Box } from "@mui/material";
import style from "../../../styles/PostDetails.module.css";
import Comment from "../Text/Comment";
import React, { useState, useEffect } from "react";
import ActivityBar from "../ActivityBar/ActivityBar";
import TextComment from "../Text/TextComment";
import { Fetch } from "../../../Trials/Controller";
import { Link } from "react-router-dom";
import CommentContainer from "../Text/CommentContainer";
import Actions from "../Actions/Actions";
const NoImage = ({ data }) => {
  const [userObj, setUserObj] = useState(null);

  const [comments, setComments] = useState(false);
  const [reload, setReload] = useState(false);
  const [reloadComments, setReloadComments] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleShowComment = () => {
    setShowComments(!showComments);
  };

  useEffect(() => {
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    formData.append("cnt_id", data.cnt_id);
    Fetch(`${process.env.REACT_APP_END_POINT}/display-comments`, formData)
      .then((res) => {
        if (res.data.success !== false) {
          setComments(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [reload, data]);

  useEffect(() => {
    const user = localStorage.getItem("Spilleet_user");

    if (user) setUserObj(user);
  }, []);

  return (
    <Box>
      <Box className={style.header_container}>
        <div className={style.title_wrapper}>
          <h1
            className={style.title}
            dangerouslySetInnerHTML={{ __html: data.title }}
          />
        </div>
        <Link to={`/user/profile/${data.username}-${data.usertoken}`}>
          <small className={style.author}>{data.username}</small>
        </Link>
      </Box>
      <Box className={style.content_wrapper}>
        <div className={style.content}>
          {/* <pre>{data.body}</pre> */}
          <div
            className={style.body}
            dangerouslySetInnerHTML={{ __html: data.body }}
          />
        </div>
        {userObj && (
          <div className={style.comment}>
                  <Actions item={data} />

          </div>
        )}
      </Box>
    </Box>
  );
};

export default NoImage;
