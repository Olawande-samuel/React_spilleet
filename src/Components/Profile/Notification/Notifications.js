import React, { useState, useContext } from "react";
import { Stack } from "@mui/material";
import { Context } from "../../../Trials/Controller";
import Notification from "./Notification";
import Layout from "../../Layout/Layout";
import { Fetch } from "../../../Trials/Controller";
import Loader from "../../Utils/Loader";
import Utils from "../../Utils/Utils";
const Notifications = () => {
  // const { notifications } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = React.useState([]);
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const close = () => {
    setShowAlert(false);
  };
  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    const data = localStorage.getItem("Spilleet_user");
    if (data) {
      const user = JSON.parse(data);

      const formData = new FormData();
      formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
      formData.append("usertoken", user.usertoken);
      Fetch(`${process.env.REACT_APP_END_POINT}/getUserNotifications`, formData)
        .then((res) => {
          setLoading(false);
          if (res.data.success === false) {
            setStatus("error");
            setContent(res.data.message);
            setShowAlert(true);
          }
          setNotifications(res.data);
        })
        .catch((err) => {
          setLoading(false);
          setStatus("error");
          setContent(err.message);
          setShowAlert(true);
        });
    }

    return () => {
      mounted = false;
    };
  }, []);
  return (
    <Layout>
      <Stack minHeight="100vh" mt={5} spacing={2} pt={9} px={5}>
        {showAlert && (
          <Utils status={status} content={content} handleAlert={close} />
        )}
        <h3 style={{ margin: "0" }}>Notifications</h3>
        <hr />
        {loading ? (
          <Loader />
        ) : (
          notifications.length > 0 &&
          notifications.map((item) => (
            <Notification key={item.id} item={item} />
          ))
        )}
      </Stack>
    </Layout>
  );
};

export default Notifications;
