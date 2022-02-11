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
                            <Typography className={Style.text}>Messages</Typography>
                            <small>Email me when someone sends me a direct message</small>
                        </Box>
                    </Box>
                    <Box display="flex" pl={3} pb={1} borderBottom="1px solid grey"  alignItems="center">
                        <Toggle />
                        <Box className={Style.text_wrapper} ml={2} >
                            <Typography className={Style.text}>Messages, Comments &amp; Mentions</Typography>
                            <small>Email me when someone comments on my content and replies to my comments</small>
                        </Box>
                    </Box>
                    <Box display="flex" pl={3} pb={1}  alignItems="center">
                        <Toggle />
                        <Box className={Style.text_wrapper} ml={2} >
                            <Typography className={Style.text}>Mentions</Typography>
                            <small>Email me when someone mentions me</small>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box my={3}  border="1px solid gray"  borderRadius="8px" boxShadow=" 0px 1px 2px rgba(0, 0, 0, 0.25)">
                <div  style={{borderBottom:"1px solid gray", padding:'4px', paddingLeft:"19px"}} className={Style.P_title}>Messages, Comments &amp; Mentions</div>
                <Box  py={1}   >
                    <Box display="flex" pl={3} pb={1} borderBottom="1px solid grey"  alignItems="center">
                        <Toggle />
                        <Box className={Style.text_wrapper} ml={2} >
                            <Typography className={Style.text}>New followers</Typography>
                            <small>Email me about new follower</small>
                        </Box>
                    </Box>
                    <Box display="flex" px={3} justifyContent="space-between"  alignItems="center">
                        <Box className={Style.text_wrapper} >
                            <Typography className={Style.text}>People you follow</Typography>
                            <small>Manage notifications from people that I follow</small>
                        </Box>
                        <Button type="submit" variant="contained" sx={{borderRadius:"25px", padding:"6px 28px"}}>Manage</Button>
                    </Box>
                </Box>
            </Box>
            <Box my={3}  border="1px solid gray"  borderRadius="8px" boxShadow=" 0px 1px 2px rgba(0, 0, 0, 0.25)">
                <div  style={{borderBottom:"1px solid gray", padding:'4px', paddingLeft:"19px"}} className={Style.P_title}>Activity on Your Content</div>
                <Box  py={1} >
                    <Box display="flex" pl={3} pb={1} borderBottom="1px solid grey"  alignItems="center">
                        <Toggle />
                        <Box className={Style.text_wrapper} ml={2} >
                            <Typography className={Style.text}>Upvotes</Typography>
                            <small>Email me when someone upvotes my content</small>
                        </Box>
                    </Box>
                    <Box display="flex" pl={3} pb={1} borderBottom="1px solid grey"  alignItems="center">
                        <Toggle />
                        <Box className={Style.text_wrapper} ml={2} >
                            <Typography className={Style.text}>Downvotes</Typography>
                            <small>Email me when someone upvotes my content</small>
                        </Box>
                    </Box>
                    <Box display="flex" pl={3}  alignItems="center">
                        <Toggle />
                        <Box className={Style.text_wrapper} ml={2} >
                            <Typography className={Style.text}>Share of my contents</Typography>
                            <small>Email me when someone shares my content</small>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Email
