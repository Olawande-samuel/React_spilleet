import { Grid, Box, Icon, useTheme, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Styles from "../../../styles/SubComments.module.css";
import { Fetch } from "../../../Trials/Controller";
import ReplyIcon from "../../../images/reply.svg";
const SubCommentAB = ({
  upvotes,
  reply,
  item,
  handleClick,
  reloadComments,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [liked, setLiked] = useState(false);

  const [totalLikes, setTotalLikes] = useState("");

  // useEffect(() => {
  //   setTotalLikes(item.total_likes);
  //   setTotalComments(item.total_comments);
  //   if (item.liked === "Yes") {
  //     setLiked(true);
  //   }
  // }, [item]);

  // useEffect(() => {
  //   if (reloadComments === true) {
  //     setHasCommented(!commented);
  //     setTotalComments(totalComments + 1);
  //   }
  // }, [reloadComments]);

  if (typeof window !== "undefined") {
    const data = localStorage.getItem("Spilleet_user");
    const uData = JSON.parse(data);

    const handleLike = () => {
      if (liked === true) {
        setLiked(false);
        setTotalLikes(totalLikes - 1);
        const formData = new FormData();
        formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
        formData.append("usertoken", uData.usertoken);
        formData.append("cnt_id", item.cmt_id);
        Fetch(`${process.env.REACT_APP_END_POINT}/likes`, formData)
          .then((res) => {
            setLiked(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setTotalLikes(totalLikes + 1);
        setLiked(!liked);
        const formData = new FormData();
        formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
        formData.append("usertoken", uData.usertoken);
        // formData.append("cnt_id", item.cmt_id);
        Fetch(`${process.env.REACT_APP_END_POINT}/likes`, formData)
          .then((res) => {
            return;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    return (
      <Grid
        container
        xs={12}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}
            className={Styles.buttonGroup}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ArrowDropUpIcon
                sx={{ fontSize: "30px", color: "#30C06A" }}
                onClick={handleLike}
              />
              {/* <span>Upvote</span> */}
              <span className={Styles.upvoteValue}>{`${
                item.total_likes !== undefined ? totalLikes : 0
              }`}</span>
            </Box>
            <Box
              sx={{
                display: "flex",
                aligntems: "center",
                justifyContent: "space-between",
              }}
              className={Styles.comment_bookmark}
            >
              <Box className="comment">
                <Box
                  sx={{ display: "flex", gap: ".5rem", alignItems: "center" }}
                >
                  <img src={ReplyIcon} alt="reply" className={Styles.icons} />
                  {/* <span onClick={handleClick}>Reply ({`${ item.total_comments !== undefined ? totalComments : 0 }`})</span> */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item justifySelf="flex-end" xs={2} className={Styles.right}>
          <div className={Styles.more}>
            <Box>
              <MoreHorizIcon sx={{ fontSize: "20px" }} />
            </Box>
          </div>
        </Grid>
      </Grid>
    );
  }
  return null;
};
export default SubCommentAB;
