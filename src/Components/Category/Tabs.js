import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom'
import Category from "./Category";
import Trending from "../Trending/Trending";

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
        <Box sx={{ p: 3 }}>
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

export default function CategoryTabs({handleClick}) {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderColor: "divider" }} display="flex" justifyContent="space-around"  alignItems="center">
        <Tabs
        variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="trends and categories"
          textColor='secondary'
          indicatorColor="secondary"
        >
          <Tab label="Trending" {...a11yProps(0)} />
          <Tab label="Category" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
          <Trending />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Category handleClick={handleClick} />
      </TabPanel>
    </Box>
  );
}