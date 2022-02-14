import React, {useState, useContext } from "react";
import { Stack } from "@mui/material";
import { Context } from "../../../Trials/Controller";
import Notification from "./Notification";
import Layout from "../../Layout/Layout";
import { Fetch } from "../../../Trials/Controller";
import Loader from "../../Utils/Loader"
import Utils from "../../Utils/Utils"
const Notifications = () => {
  // const { notifications } = useContext(Context);
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = React.useState([])
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const close = () => {
    setShowAlert(false);
  };
  React.useEffect(() => {
    let mounted = true;
    setLoading(true)
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);

      const formData = new FormData();
      formData.append("apptoken", "7FHS8S43N2JF08");
      formData.append("usertoken", user.usertoken);
      Fetch("https://spilleetapi.spilleet.com/getUserNotifications", formData)
        .then((res) => {
          setLoading(false)
          setNotifications([res.data])
        })
        .catch((err) => {
          setLoading(false)
          setStatus("error");
          setContent(err.message);
          setShowAlert(true);
        });
    }

    return () => {
      mounted = false;
    };
  }, []);
  console.log(notifications)
  return (
    <Layout>
      <Stack minHeight="100vh" mt={5} spacing={2} pt={9} px={5}>
      {showAlert && (
          <Utils status={status} content={content} handleAlert={close} />
        )}
        <h3 style={{margin:"0"}}>Notifications</h3>
        <hr />
        {loading ? <Loader /> : (
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
