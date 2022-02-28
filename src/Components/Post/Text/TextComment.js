import { Box, Stack, Card, CardContent } from "@mui/material";
import React, { useState, useEffect } from "react";
import CommentActBar from "../CommentActivityBar/CommentActBar";
import Content from "../Content/Content";
import NameDate from "../Name_Date/NameDate";
import Profile from "../Profile/Profile";
import Style from "../../../styles/TextComment.module.css";
import SubComment from "./SubComment";
import { BiUserCircle } from "react-icons/bi";
import EmptyImageProfile from "../Profile/EmptyImageProfile";
import Comment from "./Comment";
import { Fetch } from "../../../Trials/Controller";
const TextComment = ({ item }) => {
  const [reload, setReload] = useState(false);
  const [reloadComments, setReloadComments] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(false);
  const [subComments, setSubComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const openComments = () => {
    setComments(!comments);
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    formData.append("cnt_id", item.cmt_id);
    Fetch(`${process.env.REACT_APP_END_POINT}/display-comments`, formData)
      .then((res) => {
        setLoading(false);
        if (mounted) {
          if (res.data.success === false) {
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
  }, [reload, showComments, item]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    formData.append("cmt_id", item.cmt_id);
    Fetch(`${process.env.REACT_APP_END_POINT}/displayReplyOfComments`, formData)
      .then((res) => {
        setLoading(false);
        if (mounted) {
          if (res.data.success === false) {
            console.log(comments);
          } else {
            setSubComments(res.data);
          }
        }
      })
      .catch((err) => {
        setLoading(false);

        console.error(err);
      });

    return () => (mounted = false);
  }, [reload, showComments, item]);
  return (
    <Box className={Style.wrapper}>
      <Box>
        {item.photo === undefined || item.photo === "0" ? (
          <EmptyImageProfile item={item} />
        ) : (
          <Profile item={item} img={item.photo} />
        )}
      </Box>
      <Box flex="80%" overflow="hidden">
        <Stack spacing={1}>
          <NameDate name={item.username} date={item.timeago} item={item} />
          <Content content={item.comment} />
          <CommentActBar
            item={item}
            upvotes={item.likes}
            handleClick={openComments}
            reply={item.reply}
          />
        </Stack>
        {/* wait until sub comments are available */}
        <Box
          border="1px solid lightgrey"
          borderTop="none"
          maxHeight="300px"
          paddingBottom="4px"
        >
          {comments === true && (
            <>
              <Comment
                item={item}
                setReload={setReload}
                setShowComments={setShowComments}
                reloadComments={setReloadComments}
              />
              {subComments.length > 0
                ? subComments.map((SC) => <SubComment key={SC.id} item={SC} />)
                : ""}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TextComment;
