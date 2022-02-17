import { Stack, Box, CardContent } from "@mui/material";
import React, { useState, useEffect } from "react";
import ActivityBar from "../ActivityBar/ActivityBar";
// import Content from '../Content/Content'
// import NameDate from '../Name_Date/NameDate'
import NameFollow from "../Name_Date/NameFollow";
import Profile from "../Profile/Profile";
import Style from "../../../styles/TextPost.module.css";
import Title from "../Content/Title";
import PostContent from "../Content/PostContent";
import Comment from "./Comment";
import TextComment from "./TextComment";
import { Fetch } from "../../../Trials/Controller";
import EmptyImageProfile from "../Profile/EmptyImageProfile";
import Loader from "../../Utils/Loader";
const TextPost = ({ item, reloader, loadCommentFig }) => {
  const [comments, setComments] = useState([]);
  const [reload, setReload] = useState(false);
  const [reloadComments, setReloadComments] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleShowComment = () => {
    setShowComments(!showComments);
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const formData = new FormData();
    formData.append("apptoken", "7FHS8S43N2JF08");
    formData.append("cnt_id", item.cnt_id);
    Fetch("https://spilleetapi.spilleet.com/display-comments", formData)
      .then((res) => {
        setLoading(false);
        if (mounted) {
          if (res.data.success === false) {
            return;
          } else {
            setComments(res.data);
          }
        }
      })
      .catch((err) => {
        setLoading(false);

        console.error(err);
      });

    return () => (mounted = false);
  }, [reload, showComments]);

  return (
    <Box className={Style.post}>
      <Box className={Style.container}>
        <CardContent>
          <Box className={Style.wrapper}>
            <Box display="flex" className={Style.image}>
              {item.photo === "0" ? (
                <EmptyImageProfile item={item} />
              ) : (
                <Profile item={item} img={item.photo} />
              )}
            </Box>
            <Box className={Style.content}>
              <Stack spacing={1}>
                <NameFollow
                  user={item.username}
                  followed={item.following}
                  date={item.timeago}
                  item={item}
                  usertoken={item.usertoken}
                />
                <PostContent content={item.body} link={item.cnt_id}>
                  <Title title={item.title} />
                </PostContent>
              </Stack>
            </Box>
          </Box>
        </CardContent>
      </Box>
      <Box>
        <ActivityBar
          reloadComments={reloadComments}
          likes={item.total_likes}
          //   handleComment={openComment}
          reloader={reloader}
          handleShowComment={handleShowComment}
          item={item}
          comment={item.total_comments}
        />
        <Comment
          item={item}
          setReload={setReload}
          setShowComments={setShowComments}
          reloadComments={setReloadComments}
        />
        {showComments && (
          <Box
          className={Style.commentBox}
          >
            {loading ? (
              <Loader />
            ) : (
              comments.length > 0 && (
                <Box height="85%" overflow="hidden">
                  {comments.map((item) => (
                    <TextComment key={item.id} item={item} />
                  ))}
                </Box>
              )
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TextPost;
