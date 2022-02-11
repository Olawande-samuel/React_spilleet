import { Box } from "@mui/system";
import React from "react";
import Styles from "../../../styles/SubComments.module.css";
import SubCommentProfile from "../Profile/SubCommentProfile";
const NameDate = ({ name, date, img }) => {
  return (
    <Box className={Styles.nameWrapper}>
      <SubCommentProfile img={img} />
      <p className={Styles.name} dangerouslySetInnerHTML={{ __html: name }} />
      <small className={Styles.date}>{date}</small>
    </Box>
  );
};

export default NameDate;
