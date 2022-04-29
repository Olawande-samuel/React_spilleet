import { Grid, Box, Icon, useTheme, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Styles from "../../../styles/CAB.module.css";
import { Fetch } from "../../../Trials/Controller";
import ReplyIcon from "../../../images/reply.svg";
import axios from "axios";

const CommentActBar = ({
  setOpenBoxAndId,
  item,
  reloadComments,
  totalComments,
}) => {
  const [totalLikes, setTotalLikes] = useState("");

  useEffect(() => {
    setTotalLikes(item.all_likes);
  }, [item]);

  const data = localStorage.getItem("Spilleet_user");
  const uData = JSON.parse(data);

  const handleLike = async () => {
    setTotalLikes(totalLikes + 1);
    const payload = {
      apptoken: process.env.REACT_APP_APP_TOKEN,
      usertoken: uData.usertoken,
      cnt_id: item.cmt_id,
    };
    try {
       const response = await axios.post(
          `${process.env.REACT_APP_NODE_ENDPOINT}/like-post`,
          JSON.stringify(payload),
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
      if (response.data.success === false) {
        window.alert("Error liking post");
      }
    } catch (error) {
      console.error(error);
      window.alert("Error liking post");
    }
  };

  return (
    <Grid
      container
      overflow="hidden"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={9}>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}
          className={Styles.buttonGroup}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ArrowDropUpIcon
              sx={{ fontSize: "20px", color: "#30C06A" }}
              onClick={handleLike}
            />
            <span className={Styles.upvoteValue}>
              {`${item.all_likes !== undefined ? totalLikes : 0}`}
            </span>
          </Box>
          <Box
            sx={{
              display: "flex",
              aligntems: "center",
              justifyContent: "space-between",
            }}
            className={Styles.comment_bookmark}
          >
            <Box>
              <Box sx={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
                <Icon className={Styles.iconWrapper}>
                  <img src={ReplyIcon} alt="reply" className={Styles.icons} />
                </Icon>
                <span
                  className={Styles.replies}
                  onClick={() => setOpenBoxAndId(item.cmt_id)}
                >
                  Reply (
                  {`${item.total_replies !== undefined ? totalComments : 0}`})
                </span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item justifySelf="flex-end" xs={2} className={Styles.right}>
        <div className={Styles.more}>
          <Box>
            <MoreHorizIcon sx={{ fontSize: "12px" }} />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default CommentActBar;
