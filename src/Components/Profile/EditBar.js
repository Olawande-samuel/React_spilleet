import { Box, Button, Icon } from "@mui/material";
import { BsPencil } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import React from "react"
const EditBar = () => {
  const navigate = useNavigate()
  const handleLogout = async () => {
    localStorage.clear();
    const regs = await navigator.serviceWorker.getRegistrations()
    for(let reg of regs){
      reg.unregister()
    }
      navigate("/login")
  }
  return (
    <Box  display="flex"  alignItems="center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="#C4C4C4"
          borderRadius="3px"
          py={1}
          width="70%"
          margin="auto"
        >
      <Link to="/user/settings" style={{ width:"100%"}} >

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
      </Link>
        </Box>
      <Box>
        <Button onClick={handleLogout} variant="contained" sx={{textTransform:"capitalize", padding:"6px 16px", fontSize:"12px", backgroundColor:"#C035A2"}}>Log out</Button>
      </Box>
    </Box>
  );
};

export default EditBar;
