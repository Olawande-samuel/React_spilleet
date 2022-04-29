import { Box, Button, Typography } from "@mui/material"
import Toggle from "../../Switch/Switch";
import Style from "../../../styles/Setting.module.css";
import React from "react"
const Email = () => {
    return (
        <Box>
            <Box my={3}  border="1px solid gray"  borderRadius="8px" boxShadow=" 0px 1px 2px rgba(0, 0, 0, 0.25)">
                <div  style={{borderBottom:"1px solid gray", padding:'4px', paddingLeft:"19px"}} className={Style.P_title}>Messages, Comments &amp; Mentions</div>
                <Box  py={1}  >
                    <Box display="flex" pl={3} pb={1} borderBottom="1px solid grey"  alignItems="center">
                        <Toggle />
                        <Box className={Style.text_wrapper} ml={2} >
                            <Typography className={Style.text}> Comments , Likes &amp; Favourites</Typography>
                            <small>Email me when someone comments, likes or favourites on my content and replies to my comments</small>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Email
