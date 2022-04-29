import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import ActivityBar from "../ActivityBar/ActivityBar";
import Comment from "../Text/Comment";
import CommentContainer from "../Text/CommentContainer";

const Actions = ({ item }) => {
  const [openBox, setOpenBox] = useState(false);
  const [postId, setPostId] = useState(null);
  const [hasCommented, setHasCommented] = useState(false);
  const [totalComments, setTotalComments] = useState("");
  const user = localStorage.getItem("Spilleet_user")
  useEffect(() => {
    
    setTotalComments(item.total_comments);
  }, [item]);


  // function increaseComment(){
  //   setTotalComments(totalComments + 1)
  // }
  const openBoxAndSetId = (id) => {
    setOpenBox(!openBox);
    setPostId(id);
  };
  const addCommentandloadCommentlist = (id) => {
    setHasCommented(true);
    setOpenBox(true);
    setPostId(id);
    setTotalComments(totalComments + 1)
  };
  if(user === null) {
    return null
  }
  return (
    <Box>
      {/* Activity bar */}
      <ActivityBar
        setOpenBoxAndId={openBoxAndSetId}
        item={item}
        hasCommented={hasCommented}
        totalComments={totalComments}

      />

      {/* Comment Input */}
      <Comment toggleAction={addCommentandloadCommentlist} item={item} />

      {/* Comment Box */}
      {openBox ? (
        <CommentContainer open={openBox} postId={postId} item={item} />
      ) : null}
    </Box>
  );
};

export default Actions;
