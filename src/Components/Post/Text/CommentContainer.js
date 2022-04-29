import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Fetch } from "../../../Trials/Controller";
import Loader from "../../Utils/Loader";
import TextComment from "./TextComment";

const CommentContainer = ({ open, item, postId }) => {
  const [loader, setLoader] = useState(true);
  const [comments, setComments] = useState([]);
  const [noComments, setNoComments] = useState(false);
  console.log(open);
  useEffect(() => {
    let mounted = true;
    setLoader(true);
    if (postId === item.cnt_id) {
      loadComments(mounted);
    }

    return () => (mounted = false);
  }, [open, postId]);

  const loadComments = (mounted) => {
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    formData.append("cnt_id", item.cnt_id);
    Fetch(`${process.env.REACT_APP_END_POINT}/display-comments`, formData)
      .then((res) => {
        setLoader(false);
        if (mounted) {
          if (res.data.success === false) {
            setNoComments(true);
          } else {
            setComments(res.data);
          }
        }
      })
      .catch((err) => {
        setLoader(false);

        console.error(err);
      });
  };
  if (loader) {
    return (
      <Box
        border="1px solid lightgrey"
        borderTop="none"
        maxHeight="300px"
        overflow="scroll"
        paddingBottom="4px"
      >
        <Loader />
      </Box>
    );
  }

  return (
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
  );
};

export default CommentContainer;
