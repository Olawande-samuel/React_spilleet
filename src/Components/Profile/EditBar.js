import { Box, Icon } from "@mui/material";
import { BsPencil } from "react-icons/bs";
import { Link } from "react-router-dom";
import React from "react"
const EditBar = () => {
  return (
    <Box>
      <Link to="/user/settings">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="#C4C4C4"
          borderRadius="3px"
          py={1}
          width={"55%"}
          margin="auto"
          padding=""
        >
          <Box
            className="content"
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
          >
            <i style={{ fontSize: "14px", marginRight: "2px" }}>
              <BsPencil />
            </i>
            <p style={{ fontSize: "12px", cursor: "pointer" }}>Edit Profile</p>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default EditBar;
