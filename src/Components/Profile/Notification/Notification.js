import React from "react"
import { Grid } from "@mui/material"
import Profile from "../../Post/Profile/Profile"
import { FiMoreVertical } from "react-icons/fi"
import Detail from "./Detail"
import Placeholder from "../../../images/placeholder.png"
const Notification = ({item}) => {
    console.log(item)
    return (
        <Grid container borderRadius="4px" padding="10px" borderBottom="0.234px solid gray" justifyContent="space-between" alignItems="center" background="rgba(23, 17, 148, 0.29)">
            <Grid item xs={2} display="flex" justifyContent="center">
                {item.senderimgurl === "0" ?  <Profile img={Placeholder} /> : <Profile img={item.senderimgurl} />
                }
            </Grid>
            <Grid item xs={8}> 
                <Detail item={item} />
            </Grid>
            {/* <Grid item> 
                <div><span><FiMoreVertical /></span> </div>
            </Grid> */}
        </Grid>
    )
}

export default Notification
