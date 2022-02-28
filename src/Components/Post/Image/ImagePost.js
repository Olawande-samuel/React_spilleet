import React, { useContext, useState, useEffect } from "react";
import Style from "../../../styles/ImagePost.module.css";
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

  const handleShowComment = () => {
    setShowComments(!showComments);
  };

  useEffect(() => {
    if (item) {
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

  return (
    item !== undefined && (
      <div className={ profile ? Style.profile_container : Style.container} key={key}>
        <div className={Style.content}>
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
