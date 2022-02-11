import React, { useContext } from "react"
import { Stack } from "@mui/material";
import { Context } from "../../../Trials/Controller";
import Notification from "./Notification";
import Layout from "../../Layout";
const Notifications = () => {
  const { notifications } = useContext(Context);
  return (
    <Layout>
      <Stack minHeight="100vh" spacing={2}pt={9} px={10}>
        {notifications.length > 0 &&
          notifications.map((item) => (
            <Notification key={item.id} item={item} />
          ))}
      </Stack>
    </Layout>
  );
};

export default Notifications;
