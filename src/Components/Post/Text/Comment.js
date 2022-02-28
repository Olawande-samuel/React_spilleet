import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import Styles from "../../../styles/Comment.module.css";
import { Fetch } from "../../../Trials/Controller";
import Loader from "../../Utils/Loader";
import { BsEmojiSmile } from "react-icons/bs";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { Link } from "react-router-dom";
import Placeholder from "../../../images/placeholder.png";

const Comment = ({ item, setReload, setShowComments, reloadComments }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [showEmoji, setShowEmoji] = useState(false);

  const handleEmoji = () => {
    setShowEmoji(!showEmoji);
  };
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setComment(comment + emoji);
  };

  if (typeof window != "undefined") {
    const data = localStorage.getItem("user");
    const anotherData = localStorage.getItem("deets");
    const uData = JSON.parse(data);
    const info = JSON.parse(anotherData);
    if (data) {
      const handleChange = (e) => {
        setComment(e.target.value);
      };
      const handleComment = (e) => {
        setLoading(item.cnt_id);
        e.preventDefault();
        const formData = new FormData();
        formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
        formData.append("usertoken", uData.usertoken);
        formData.append("cnt_id", item.cnt_id);
        formData.append("comment", comment);
        formData.append("cmt_id_cmt", item.cmt_id ? item.cmt_id : "");

        Fetch(`${process.env.REACT_APP_END_POINT}/add-comment`, formData)
          .then((res) => {
            setReload(true);
            setShowComments(true);
            setComment("");
            setLoading(false);
            reloadComments(true);
            setTimeout(() => {
              reloadComments(false);
              setReload(false);
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      };
      return (
        <Grid
          container
          gap={1}
          justifyContent="space-around"
          alignItems="center"
          p={1}
          border="1px solid lightgray"
          overflow="hidden"
        >
          <Grid item xs={8} display="flex">
            <Box mr={2}>
              <div className={Styles.commentProfileWimgurlrapper}>
                {/* <Link to="/user/profile"> */}
                <img
                  src={info.imgurl === "0" ? Placeholder : info.imgurl}
                  alt="profile"
                  width={32}
                  height={34}
                  className={Styles.image}
                  style={{ borderRadius: "50%" }}
                />
                {/* </Link> */}
              </div>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              width="100%"
              className={Styles.inputWrapper}
            >
              <i
                style={{
                  marginRight: "-22px",
                  zIndex: "100",
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={handleEmoji}
              >
                <BsEmojiSmile />
              </i>
              <input
                className={Styles.text}
                type="text"
                name="comment"
                id="comment"
                placeholder="Add a comment..."
                value={comment}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              {loading === item.cnt_id ? (
                <Loader />
              ) : (
                <>
                  <button onClick={handleComment} className={Styles.button}>
                    {" "}
                    Post{" "}
                  </button>
                  <button onClick={handleComment} className={Styles.small}>
                    {" "}
                    Post{" "}
                  </button>
                </>
              )}
            </Box>
          </Grid>
          {showEmoji && (
            <Grid item>
              <Picker
                onSelect={addEmoji}
                style={{ width: "100%" }}
                title={""}
                showPreview={false}
                showSkinTones={false}
              />
            </Grid>
          )}
        </Grid>
      );
    }
  }

  return null;
};

export default Comment;
