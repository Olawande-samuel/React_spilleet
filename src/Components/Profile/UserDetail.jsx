import userAuth from "../Auth/UserAuth";
import Profile from "./Profile";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Utils from "../Utils/Utils";
import { Fetch } from "../../Trials/Controller";

const ProfileDeets = () => {
  const [data, setData] = useState([]);
  const [usertoken, setUsertoken] = useState("");
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const close = () => {
    setShowAlert(false);
  };
  const { name } = useParams;
  // useEffect(() => {
  //   setLoading(true);
  //   if (name) {
  //     const separate = name.split("-");
  //     const token = separate.slice(-1);
  //     setUsertoken(token[0]);
  //     const formData = new FormData();
  //     formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
  //     formData.append("usertoken", token[0]);
  //     Fetch(`${process.env.REACT_APP_END_POINT}/getUserData`, formData)
  //       .then((res) => {
  //         setLoading(false);
  //         if (res.data.success === false) {
  //           return
  //         } else {
  //           setData({ ...res.data });
  //           localStorage.setItem("pers", res.data.usertoken)
  //         }
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         setStatus("error");
  //         setContent(err.message);
  //         setShowAlert(true);
  //       });
  //   }
  // }, [name]);

  return (
    <>
      <div>
        {showAlert && (
          <Utils status={status} content={content} handleAlert={close} />
        )}
      </div>
      <Profile data={data} id={name} />
    </>
  );
};

export default ProfileDeets;
