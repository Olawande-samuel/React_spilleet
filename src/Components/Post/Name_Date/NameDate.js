import { Box } from "@mui/system";
import React from "react";
import Styles from "../../../styles/Name.module.css";
import { Link } from "react-router-dom";
const NameDate = ({ name, date, item }) => {
  return (
    <Box className={Styles.wrapper}>
      <Link
        to={
          item ? `/user/profile/${item.username}-${item.usertoken}` : "/posts"
        }
      >
        <p className={Styles.name}>{name}</p>
      </Link>
      <small className={Styles.date}>{date}</small>
    </Box>
  );
};

export default NameDate;
