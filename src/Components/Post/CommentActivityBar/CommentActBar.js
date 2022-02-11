import { Grid, Box, Icon, useTheme, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Styles from "../../../styles/CAB.module.css";
import { Fetch } from "../../../Trials/Controller";
import ReplyIcon from "../../../images/reply.svg"

const CommentActBar = ({
  upvotes,
  reply,
  handleClick,
  item,
  reloadComments,
}) => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [liked, setLiked] = useState(false);
  const [commented, setHasCommented] = useState(false);

  const [totalLikes, setTotalLikes] = useState("");
  const [totalComments, setTotalComments] = useState("");

  useEffect(() => {
    setTotalLikes(item.all_likes);
    setTotalComments(item.total_replies);
    if (item.liked === "Yes") {
      setLiked(true);
    }
  }, [item]);

  useEffect(() => {
    if (reloadComments === true) {
      setHasCommented(!commented);
      setTotalComments(totalComments + 1);
    }
  }, [reloadComments]);

  if (typeof window !== "undefined") {
    const data = localStorage.getItem("user");
    const uData = JSON.parse(data);

    const handleLike = () => {
      if (liked === true) {
        setLiked(false);
        setTotalLikes(totalLikes - 1);
        const formData = new FormData();
        formData.append("apptoken", "7FHS8S43N2JF08");
        formData.append("usertoken", uData.usertoken);
        formData.append("cnt_id", item.cmt_id);
        Fetch("https://spilleetapi.spilleet.com/likes", formData)
          .then((res) => {
            setLiked(false);
          })
          .catch((err) => {
          });
      } else {
        setTotalLikes(totalLikes + 1);
        setLiked(!liked);
        const formData = new FormData();
        formData.append("apptoken", "7FHS8S43N2JF08");
        formData.append("usertoken", uData.usertoken);
        formData.append("cnt_id", item.cmt_id);
        Fetch("https://spilleetapi.spilleet.com/likes", formData)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={9}>
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
                item.all_likes !== undefined ? totalLikes : 0
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
                  <Icon className={Styles.iconWrapper}>
                    <img
                      src={ReplyIcon}
                      alt="reply"
                      className={Styles.icons}
                      width={matches ? 20 : 30}
                      height={matches ? 20 : 30}
                    />
                  </Icon>
                  <span onClick={handleClick}>
                    Reply (
                    {`${item.total_replies !== undefined ? totalComments : 0}`}
                    )
                  </span>
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

export default CommentActBar;
