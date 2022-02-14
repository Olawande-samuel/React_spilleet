import { Stack, Box } from "@mui/material"
import Style from "../../../styles/Follower.module.css"
import React from "react"
const Detail = ({item}) => {
    return (
        <Stack>
            <Box display="flex" alignItems="center">
                <p className={Style.name}>{item.note}</p>
                <p className={Style.profile}>{item.name}</p>
            </Box>
            <Box>
                <div className={Style.text}>{item.text}</div>
            </Box>
        </Stack>
    )
}

export default Detail