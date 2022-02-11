import React from "react";
import Styles from "../../../styles/SubComments.module.css";
import Placeholder from "../../../images/placeholder.png"
const SubCommentProfile = ({img}) => {
  return (
    <div className={Styles.profileWrapper}>
      {img === undefined || img === "0" ? (
        <img src={Placeholder} alt="profile picture" width={20} height={21} className={Styles.image} />

      ):(
        <img src={`${img}`} alt="profile picture" width={20} height={21} className={Styles.image} />
      )}
    </div>
  );
};

export default SubCommentProfile;
