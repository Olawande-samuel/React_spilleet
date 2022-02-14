import { Badge, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Styles from "../../styles/Nav.module.css";
import { Link } from "react-router-dom";

const Notification = () => {
  return (
    <Box className={Styles.notification}>
      <Link to="/user/notifications">
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          {/* <Badge badgeContent={17} color="error"> */}
          <Badge color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Link>
    </Box>
  );
};

export default Notification;
