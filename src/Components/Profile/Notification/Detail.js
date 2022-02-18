import { Stack, Box } from "@mui/material"
import Style from "../../../styles/Follower.module.css"
import React from "react"
import {Link } from "react-router-dom"
const Detail = ({item}) => {
    return (
        <Stack>
            <Box display="flex" alignItems="center">
                <Link to={`/user/profile/${item.sendername}-${item.sendertoken}`}>
                    <p className={Style.name}>{item.sendername}</p>
                </Link>
                <p className={Style.profile}>{item.timeago}</p>
            </Box>
            <Box>
                {item.posttoken === "0" ?  
                    <div className={Style.text}>{item.note}</div> :

                <Link to={`/posts/${item.posttoken}`}>
                    <div className={Style.text}>{item.note}</div>
                </Link>
                }
            </Box>
        </Stack>
    )
}

export default Detail