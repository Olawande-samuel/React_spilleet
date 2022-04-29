import { Stack, Box, CardContent } from "@mui/material";
import React, { useState } from "react";
import ActivityBar from "../ActivityBar/ActivityBar";
import NameFollow from "../Name_Date/NameFollow";
import Profile from "../Profile/Profile";
import Style from "../../../styles/TextPost.module.css";
import Title from "../Content/Title";
import PostContent from "../Content/PostContent";
import Comment from "./Comment";
import EmptyImageProfile from "../Profile/EmptyImageProfile";
import CommentContainer from "./CommentContainer";
import Actions from "../Actions/Actions";

const TextPost = ({ item, reloader, loadCommentFig, profile }) => {
 
  return (
    <Box className={profile ? Style.profile_post :Style.post}>
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
      {/* <Box>
        <ActivityBar
          reloadComments={reloadComments}
          likes={item.total_likes}
          reloader={reloader}
          handleShowComment={handleShowComment}
          item={item}
          comment={item.total_comments}
          commentReload={handleCommentReload}
        />
        <Comment
          item={item}
          setReload={setReload}
          setShowComments={setShowComments}
          reloadComments={setReloadComments}
          postId={setClickedPostID}

        />
       {showComments === true && <CommentContainer item={item} postID={clickedPostID} reload={showComments}   />}
        
      </Box> */}
      <Actions item={item} />
    </Box>
  );
};

export default TextPost;
