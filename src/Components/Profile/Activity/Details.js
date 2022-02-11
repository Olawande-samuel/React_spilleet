import { Stack, Box } from "@mui/material"
import Style from "../../../styles/Follower.module.css"
import React from "react"
const Details = ({item}) => {
    return (
        <Stack className={Style.detailWrapper}>
            <Box display="flex" alignItems="center">
                <p className={Style.name}>{item.followed_name || item.follower_name}</p>
                <p className={Style.profile}>{item.about}</p>
            </Box>
            <Box>
                <div className={Style.followerCount}><span>{item.followers}</span> Followers</div>
            </Box>
        </Stack>
    )
}

export default Details
