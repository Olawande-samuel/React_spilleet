import React, { useState, useEffect } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Grid, Box, Icon } from "@mui/material";
import Styles from "../../../styles/ActivityBar.module.css";
import { Fetch } from "../../../Trials/Controller";
import { FaRegComment, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { BiPencil } from "react-icons/bi";
import EditModal from "../Text/EditModal";
import axios from "axios";

const ActivityBar = ({ setOpenBoxAndId, item, reloadComments,hasCommented, totalComments }) => {
  const [liked, setLiked] = useState(false);
  const [commented, setHasCommented] = useState(false);
  const [isFavourited, setIsFavourited] = useState(false);
  const [totalLikes, setTotalLikes] = useState("");
  // const [totalComments, setTotalComments] = useState("");
  const [details, setDetails] = useState({});

  const data = localStorage.getItem("Spilleet_user");
  const uData = JSON.parse(data);


  useEffect(() => {
    item.faved !== "Yes" ? setIsFavourited(false) : setIsFavourited(true);
    if (item.liked === "Yes") {
      setLiked(true);
    }
    // Set number of likes and comments
    setTotalLikes(item.total_likes);
    // setTotalComments(item.total_comments);
  }, [item]);


  
  // modal control
  const [open, setOpen] = React.useState(false);
// set items to populate modal
  const handleOpen = () => {
    setOpen(true);
    setDetails(item);
  };

  useEffect(() => {
    if (hasCommented === true) {
      setHasCommented(!commented);
      // setTotalComments(totalComments + 1);
    }
  }, [hasCommented]);

    const handleLike = async () => {
      setTotalLikes(totalLikes + 1);
      // setLiked(!liked);
      setLiked(true);
      const formData = new FormData();
      formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
      formData.append("usertoken", uData.usertoken);
      formData.append("cnt_id", item.cnt_id);

      const data = {
        usertoken: uData.usertoken,
        cnt_id: item.cnt_id,
        apptoken: process.env.REACT_APP_APP_TOKEN,
        creator: item.usertoken,
      };
      const dat = JSON.stringify(data);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_NODE_ENDPOINT}/like-post`,
          dat,
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error(error);
        window.alert("Error liking post")
      }
    };

    const favourite = () => {
      setIsFavourited(!isFavourited);
      const formData = new FormData();
      formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
      formData.append("usertoken", uData.usertoken);
      formData.append("cnt_id", item.cnt_id);
      Fetch(`${process.env.REACT_APP_END_POINT}/favorite`, formData)
        .then((res) => {
          return;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <Grid
        container
        className={Styles.wrapper}
        justifyContent="space-between"
        alignItems="center"
        gap={1}
      >
        <Grid xs={6} item className={Styles.left}>
          <Box
            display="flex"
            alignItems="center"
            gap=".5rem"
            justifyContent="space-between"
            className={Styles.buttonGroup}
          >
            <Box display="flex" alignitems="center" gap={2} pr={1}>
              {item.usertoken !== uData.usertoken ? (
                <button
                  className={Styles.like_btn}
                  onClick={handleLike}
                  style={{
                    backgroundColor: `${liked === true ? "#C035A2" : "white"}`,
                  }}
                >
                  <ArrowDropUpIcon
                    sx={{ fontSize: "15px", color: "#C035A2" }}
                  />
                </button>
              ) : (
                ""
              )}
              <span className={Styles.icon}>{`${
                item.total_likes !== undefined ? totalLikes : 0
              }`}</span>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignitems: "center",
              justifycontent: "space-between",
            }}
            className={Styles.comment_bookmark}
          >
            <Box className="comment">
              <Box
                sx={{ display: "flex", gap: ".5rem", alignItems: "center" }}
                onClick={()=>setOpenBoxAndId(item.cnt_id)}
              >
                <i className={Styles.icon}>
                  {" "}
                  <FaRegComment />{" "}
                </i>
                
                <span className={Styles.icon}>
                  {item !== undefined ? totalComments : 0}
                </span>
              </Box>
            </Box>
            <Box
              className="bookmark"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {isFavourited ? (
                <i
                  className={Styles.icon}
                  style={{ color: "#171194" }}
                  onClick={favourite}
                >
                  {" "}
                  <FaBookmark />{" "}
                </i>
              ) : (
                <i className={Styles.icon} onClick={favourite}>
                  {" "}
                  <FaRegBookmark />{" "}
                </i>
              )}
              
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          justifySelf="flex-end"
          xs={4}
          md={5}
          className={Styles.right}
        >
          {item.usertoken === uData.usertoken && (
            <Box
              className={Styles.share}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <i className={Styles.icon} onClick={handleOpen}>
                <BiPencil />
              </i>
            </Box>
          )}
        </Grid>
        {item.cnt_id === details.cnt_id && (
          <EditModal open={open} setOpen={setOpen} item={item}  />
        )}
      </Grid>
    );
 
};

export default ActivityBar;
