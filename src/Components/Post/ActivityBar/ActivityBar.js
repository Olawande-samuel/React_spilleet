import React, { useState, useEffect } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Grid, Box, Icon } from "@mui/material";
import Styles from "../../../styles/ActivityBar.module.css";
import { Fetch } from "../../../Trials/Controller";
import { FaRegComment, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { BiPencil } from "react-icons/bi";
import EditModal from "../Text/EditModal";

const ActivityBar = ({
  likes,
  comment,
  handleComment,
  handleShowComment,
  item,
  reloadComments,
}) => {
  const [liked, setLiked] = useState(false);
  const [commented, setHasCommented] = useState(false);
  const [isFavourited, setIsFavourited] = useState(false)
  const [totalLikes, setTotalLikes] = useState("");
  const [totalComments, setTotalComments] = useState("");
  const [details, setDetails] = useState({});

  useEffect(() => {
    setTotalLikes(item.total_likes);
    item.faved !== "Yes" ? setIsFavourited(false) : setIsFavourited(true);
    setTotalComments(item.total_comments);
    if(item.liked === "Yes"){
      setLiked(true)
    }
  }, [item]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setDetails(item)
  }
  useEffect(() => {
    if (reloadComments === true) {
      setHasCommented(!commented);
      setTotalComments(totalComments + 1);
    }
  }, [reloadComments]);


    const data = localStorage.getItem("user");
    const uData = JSON.parse(data);

    if (data) {
      const handleLike = () => {
        // if(liked === true){
        //   setLiked(false);
        //   setTotalLikes(totalLikes - 1);
        //   const formData = new FormData();
        //   formData.append("apptoken", "7FHS8S43N2JF08");
        //   formData.append("usertoken", uData.usertoken);
        //   formData.append("cnt_id", item.cnt_id);
        //   Fetch("https://spilleetapi.spilleet.com/likes", formData)
        //   .then((res) => {
        //     setLiked(false);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
          
        // } else {

          setTotalLikes(totalLikes + 1);
          // setLiked(!liked);
          setLiked(true);
          const formData = new FormData();
          formData.append("apptoken", "7FHS8S43N2JF08");
          formData.append("usertoken", uData.usertoken);
          formData.append("cnt_id", item.cnt_id);
          Fetch("https://spilleetapi.spilleet.com/likes", formData)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });

        // }
      };

      const favourite = () => {
          setIsFavourited(!isFavourited)
        const formData = new FormData();
          formData.append("apptoken", "7FHS8S43N2JF08");
          formData.append("usertoken", uData.usertoken);
          formData.append("cnt_id", item.cnt_id);
          Fetch("https://spilleetapi.spilleet.com/favorite", formData)
          .then((res) => {
            console.log(res);
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
              sx={{
                display: "flex",
                alignitems: "center",
                gap: ".5rem",
                justifycontent: "space-between",
              }}
              className={Styles.buttonGroup}
            >
              <Box sx={{ display: "flex", alignItems: "center" }} gap={2} pr={1}>
                {item.usertoken !== uData.usertoken ? (
                   <button
                   className={Styles.like_btn}
                   onClick={handleLike}
                   style={{ backgroundColor: `${liked === true ?  "#30C06A" : "white"}` }}
                 >
                   <ArrowDropUpIcon
                     sx={{ fontSize: "30px", color: "#30C06A" }}
                   />
                 </button>
                ):("") }
                <span className={Styles.icon}>{`${ item.total_likes !== undefined ? totalLikes : 0 }`}</span></Box>
              {/* <div className={Styles.line}></div> */}
              {/* <Box className={Styles.buttonGroup}>
                <button className={Styles.like_btn} onClick={handleDisLike}>
                  <ArrowDropDownIcon
                    sx={{ fontSize: "30px", color: "#E11E1E" }}
                  />
                </button>
              </Box> */}
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
                <Box sx={{ display: "flex", gap: ".5rem", alignItems: "center" }} onClick={handleShowComment} >
                  <i className={Styles.icon}> <FaRegComment /> </i>
                  {/* <Icon className={Styles.iconWrapper}>
                    <img
                      src="/comment.svg"
                      alt="comments"
                      className={Styles.icons}
                      
                    />
                  </Icon> */}
                  <span className={Styles.icon}>
                    {item !== undefined ? totalComments : 0}
                  </span>
                </Box>
              </Box>
              <Box className="bookmark" display="flex" justifyContent="center" alignItems="center">
                {isFavourited  ? 
                <i className={Styles.icon}  style={{color:"#171194"}} onClick={favourite} > <FaBookmark  /> </i>
                :
                <i className={Styles.icon} onClick={favourite} > <FaRegBookmark /> </i>
              }
                {/* <Icon className={Styles.iconWrapper}>
                  <img
                    src="/bookmark.svg"
                    alt="bookmark"
                    className={Styles.icons}
                   
                  />
                </Icon> */}
              </Box>
            </Box>
          </Grid>
          <Grid item justifySelf="flex-end" xs={4} md={5} className={Styles.right}>
          {item.usertoken === uData.usertoken  && (
            <div className={Styles.share} display="flex" justifyContent="center" alignItems="center">
              <i className={Styles.icon}  onClick={handleOpen}><BiPencil /></i>
            </div>
          )}
          </Grid>
          {item.cnt_id === details.cnt_id && <EditModal open={open} setOpen={setOpen} item={item} />
          }

        </Grid>
      );
    }
    return null
};

export default ActivityBar;
