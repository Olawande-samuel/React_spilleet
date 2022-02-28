import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EmptyPost from "./Empty/EmptyPost";
import EmptyFollowers from "./Empty/EmptyFollowers";
import EmptyFollowing from "./Empty/EmptyFollowing";
import EmptySaves from "./Empty/EmptySaves";
import FollowersGroup from "./Activity/FollowersGroup";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import Following from "./Activity/Following";
import UserPosts from "./Activity/UserPosts";
import Save from "./Activity/Save";
import Style from "../../styles/Profile.module.css";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={Style.sides}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ data }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {/* <Box></Box> */}
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="profile options"
          textColor='secondary'
          indicatorColor="secondary"
          // ml="auto"
        >
          <Tab
            label="Post"
            {...a11yProps(0)}
            style={{
              minWidth: "80px",
              padding: "12px 5px",
              fontSize: "clamp(0.675rem, 1vw, 16px)",
            }}
          />
          <Tab
            label="Followers"
            {...a11yProps(1)}
            style={{
              minWidth: "80px",
              padding: "12px 5px",
              fontSize: "clamp(0.675rem, 1vw, 16px)",
            }}
          />
          <Tab
            label="Following"
            {...a11yProps(2)}
            style={{
              minWidth: "80px",
              padding: "12px 5px",
              fontSize: "clamp(0.675rem, 1vw, 16px)",
            }}
          />
          <Tab
            label="Saves"
            {...a11yProps(3)}
            style={{
              minWidth: "80px",
              padding: "12px 5px",
              fontSize: "clamp(0.675rem, 1vw, 16px)",
            }}
          />
        </Tabs>
        {/* <Box display="flex" justifyContent="flex-end"  alignItems="center">
          <Link to="/user/settings">
          <BsThreeDotsVertical />
          </Link>
        </Box> */}
      </Box>

      <TabPanel value={value} index={0}>
        <UserPosts data={data} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <FollowersGroup data={data} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Following data={data} />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Save data={data} />
      </TabPanel>
    </Box>
  );
}
