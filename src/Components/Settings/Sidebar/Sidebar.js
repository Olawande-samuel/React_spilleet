import { Box, Stack } from "@mui/material"
import React from "react"
import { Link, useLocation, useParams } from "react-router-dom";
import Style from "../../../styles/Setting.module.css"
const sideLinks = [
    {id:1, title:"Account",path:"/user/settings"},
    {id:2,title:"Privacy",path:"/user/settings/privacy"},
    {id:3,title:"Email & Notification",path:"/user/settings/email_notification"},
]
const Sidebar = () => {

    const router = useLocation();

    console.log(router)
    return (
        <Stack spacing={1.5}>
            <Box py={1} borderBottom="1px solid gray">
                <p className={Style.title}>Settings</p>
            </Box>
            <Stack spacing={1}>
                {sideLinks.length >0 && sideLinks.map(item=>(    
                    <Link key={item.id} to={item.path}><a className={router.pathname ===item.path ? Style.activeLink : Style.link} href="">{item.title}</a></Link>
                ))}
                
            </Stack>
        </Stack>
        
    )
}

export default Sidebar
