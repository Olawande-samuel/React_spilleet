import { Box } from "@mui/material";
import style from "../../../styles/PostDetails.module.css";
import Comment from "../Text/Comment";
import React, { useState, useEffect } from "react";
import ActivityBar from "../ActivityBar/ActivityBar";
import TextComment from "../Text/TextComment";
import { Fetch } from "../../../Trials/Controller";
import { Link } from "react-router-dom";
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
    const user = localStorage.getItem("user");

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
            <ActivityBar
              reloadComments={reloadComments}
              handleShowComment={handleShowComment}
              item={data}
              likes={data.total_comments}
              comment={data.total_likes}
            />
            <Comment
              item={data}
              setReload={setReload}
              setShowComments={setShowComments}
              reloadComments={setReloadComments}
            />
            {showComments === true && comments.length > 0 && (
              <Box
                border="1px solid lightgrey"
                borderTop="none"
                maxHeight="400px"
                overflow="hidden"
                paddingBottom="4px"
              >
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
          </div>
        )}
      </Box>
    </Box>
  );
};

export default NoImage;
