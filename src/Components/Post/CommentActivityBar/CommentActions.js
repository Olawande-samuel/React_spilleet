import { Box, menuItemClasses } from "@mui/material";
import React, { useState, useEffect } from "react";
import Comment from "../Text/Comment";
import CommentContainer from "../Text/CommentContainer";
import CommentActBar from "./CommentActBar";
import CommentRepliesContainer from "./CommentRepliesContainer";

const CommentActions = ({ item }) => {
  const [openBox, setOpenBox] = useState(false);
  const [postId, setPostId] = useState(null);
  const [hasCommented, setHasCommented] = useState(false);
  const [totalComments, setTotalComments] = useState("");

  useEffect(() => {
    setTotalComments(item.total_replies);
  }, [item]);

  function increaseComment() {
    setTotalComments(totalComments + 1);
  }
  const openBoxAndSetId = (id) => {
    setOpenBox(!openBox);
    setPostId(id);
  };
  const addCommentandloadCommentlist = (id) => {
    setHasCommented(true);
    setOpenBox(true);
    setPostId(id);
    setTotalComments(totalComments + 1);
  };
  console.log(postId);
  return (
    <Box>
      {/* activity bar */}
      <CommentActBar
        setOpenBoxAndId={openBoxAndSetId}
        item={item}
        hasCommented={hasCommented}
        totalComments={totalComments}
      />

      {openBox ? (
        <>
          <Comment
            toggleAction={addCommentandloadCommentlist}
            item={item}
            isSubComment={true}
          />
          <CommentRepliesContainer open={openBox} postId={postId} item={item} />
        </>
      ) : null}
    </Box>
  );
};

export default CommentActions;
