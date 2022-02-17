import { Box, Stack, Card, CardContent } from "@mui/material";
import React from "react";
import SubCommentAB from "../CommentActivityBar/SubCommentAB";
import SubContent from "../Content/SubContent";
import SubNameDate from "../Name_Date/SubNameDate";
import Style from "../../../styles/SubComments.module.css";
import SubCommentProfile from "../Profile/SubCommentProfile";
import Comment from "./Comment";
import Loader from "../../Utils/Loader";
const SubComment = ({ item }) => {
  return (
    <Box overflow="hidden" className={Style.wrapper}>
      <Box width="100%">
        <Stack spacing={1}>
          <SubNameDate name={item.username} date={item.timeago} img={item.photo} />
          <SubContent content={item.comment} />
          <SubCommentAB upvotes={item.likes} item={item} reply={item.total_replies} />
          {/* <Comment
          item={item}
          setReload={setReload}
          setShowComments={setShowComments}
          reloadComments={setReloadComments}
        />
        {showComments && <Box border="1px solid lightgrey" borderTop="none" maxHeight="300px" overflow="scroll" paddingBottom="4px" >
                
          {
          loading ? <Loader /> :(
          comments.length > 0 && (
              <Box height="85%" overflow="scroll">
                {comments.map((item) => (
                  <SubComment key={item.id} item={item} />
                ))}
              </Box>
          ))}
          </Box>} */}
        </Stack>
      </Box>
    </Box>
  );
};

export default SubComment;
