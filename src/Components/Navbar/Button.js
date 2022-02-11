// @ts-nocheck
import { Button } from "@mui/material";
import React from "react";
import Styles from "../../styles/Nav.module.css";
import { Link } from "react-router-dom";
const Btn = () => {
    const access = localStorage.getItem("user");

  if (access) {
    const useable = JSON.parse(access);
    return (
      <div className={Styles.buttonWrapper}>
        <Link to="/user/create-post">
          <button
            type="submit"
            className={Styles.addPost}
          >
            Add Post
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div className={Styles.buttonWrapper}>
      <Link to="/login">
      <button
        type="submit"
        className={Styles.addPost}
        sx={{ fontWeight: "700" }}
        variant="contained"
        >
        Sign in
      </button>
      </Link>
    </div>
  );
};

export default Btn;
