import { Box } from "@mui/material"
import Logo from "../Navbar/Logo"
import { FaUserAlt } from "react-icons/fa"
import { AiOutlineMenu } from "react-icons/ai"
import { RiArrowDropDownLine } from "react-icons/ri"
import style from "../../styles/Manage.module.css"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from "react"
import {Link, useNavigate} from "react-router-dom";
import LightLogo from "../../images/LightLogo.png"

const Header = ({showSidebar}) => {
    return (
        <Box className={style.header_container}>
            <Box className={style.ham}>
                <i style={{fontSize:"24px", color:"white"}} onClick={showSidebar}>
                    <AiOutlineMenu />
                </i>
            </Box>
            <Box className={style.logo}>
            <Link to="/admin">
              <img src={LightLogo} alt="App Logo" width={160} height={48} />
            </Link>
            </Box>
            <Box className={style.user}>
                <div className={style.user_wrapper}>
                    <i>
                        <FaUserAlt />
                    </i>
                    <p>Admin</p>
                    <i>
                    <BasicMenu />
                    </i>
                </div>
            </Box>
        </Box>
    )
}


 function BasicMenu() {
     const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () =>{
      localStorage.clear();
      handleClose()
      navigate("/admin/login")
  }
  return (
    <div>
      {/* <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */}
      <RiArrowDropDownLine 
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem>
        <Link to="/admin/change-password">Change Password</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default Header
