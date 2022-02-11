import { Box } from "@mui/material";
import style from "../../../styles/PostDetails.module.css";
import ActivityBar from "../ActivityBar/ActivityBar";
import Comment from "../Text/Comment";
import React, { useState, useEffect } from "react";
import { Fetch } from "../../../Trials/Controller";
import TextComment from "../Text/TextComment";

const WithImage = ({post}) => {
  const [userObj, setUserObj] = useState(null);
  const [comments, setComments] = useState(false);
  const [reload, setReload] = useState(false);
  const [reloadComments, setReloadComments] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const handleShowComment = () => {
    setShowComments(!showComments);
  };
  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data) setUserObj(data);
  }, []);
  useEffect(() => {
    const formData = new FormData();
    formData.append("apptoken", "7FHS8S43N2JF08");
    formData.append("cnt_id", post.cnt_id);
    Fetch("https://spilleetapi.spilleet.com/display-comments", formData)
      .then((res) => {
        if(res.data.success !== false){
            setComments(res.data)
        }
      })
      .catch((err) => {
        console.error(err)
      });
  }, [reload, post]);
  return (
    <Box className={style.post_container}>
      <Box className={style.header_wrapper} mb={1}>
        <div className={style.image_title_wrapper}>
          <h1 className={style.title} dangerouslySetInnerHTML={{ __html: post.title }} />
          <div className={style.author}>
            <span>by</span> {post.username}
          </div>
        </div>
      </Box>
      <Box >
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
          <p className={style.body} dangerouslySetInnerHTML={{ __html: post.body }}  />
        </Box>
      </Box>

      {userObj && (
        <Box className={style.comment_wrapper}>
          <Box className={style.comment} backgroundColor="#eee">
            <ActivityBar reloadComments={reloadComments}  handleShowComment={handleShowComment} item={post}  likes={post.total_comments}  comment={post.total_likes} />
            <Comment  item={post} setReload={setReload} setShowComments={setShowComments} reloadComments={setReloadComments} />
            {showComments === true && comments.length > 0 && (
                      <Box border="1px solid lightgrey" borderTop="none" maxHeight='400px' overflow="hidden" paddingBottom="4px"  >
                          <>
                              <Box height="85%" overflow="hidden">
                                  {comments.map((item) => (
                                      <TextComment key={item.id} item={item} />
                                      ))}
                              </Box>
                              {/* <Box display="flex" height="10%" justifyContent="center" alignItems="center">
                                  <button className={Style.moreBtn}> <i style={{fontSize:"18px"}}> <RiArrowDropDownLine /> </i> View more comments</button>
                              </Box> */}
                          </>
                      </Box>
                  )}
          </Box>
      </Box>
      )}
    </Box>
  );
};

export default WithImage;
