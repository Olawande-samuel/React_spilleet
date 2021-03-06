import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import Styles from "../../../styles/Comment.module.css";
import Loader from "../../Utils/Loader";
import { BsEmojiSmile } from "react-icons/bs";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import Placeholder from "../../../images/placeholder.png";
import axios from "axios";

const Comment = ({ item, setReload, toggleAction, isSubComment=false }) => {
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

  const data = localStorage.getItem("Spilleet_user");
  const anotherData = localStorage.getItem("deets");
  const uData = JSON.parse(data);
  const info = JSON.parse(anotherData);

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleComment = async (e) => {
    setLoading(item.cnt_id);
    e.preventDefault();
    const data = {
      apptoken: process.env.REACT_APP_APP_TOKEN,
      usertoken: uData.usertoken,
      cnt_id: item.cnt_id,
      comment: comment,
      cmt_id_cmt: item.cmt_id ? item.cmt_id : "",
      creator: item.usertoken,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NODE_ENDPOINT}/comment`,
        JSON.stringify(data),
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      setLoading(false);
      if (response.data.success === true) {
        setComment("");
        toggleAction(item.cnt_id);
      } else {
        window.alert(response.message);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
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
        {isSubComment ? null : (

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
              )}
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
                Post
              </button>
              <button onClick={handleComment} className={Styles.small}>
                Post
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
};

export default Comment;
