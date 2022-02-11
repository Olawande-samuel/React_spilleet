// @ts-nocheck
import { Stack } from "@mui/material";
import React from "react";
import {useLocation, Link} from "react-router-dom"
import Style from "../../styles/Manage.module.css"
const sideLinks = [
    {id:1, title:"Manage Posts",path:"/admin/posts"},
    {id:2,title:"Manage Admins",path:"/admin"},
    {id:3,title:"Manage Topics",path:"/admin/topics"},
    // {id:4,title:"Manage Categories",path:"/admin/categories"},
]
const Sidebar = () => {
    const router = useLocation();
    return (
        <Stack spacing={1.5} className={Style.wrapper}>
            <Stack>
                {sideLinks.length > 0 && sideLinks.map(item=>(    
                    <Link key={item.id} to={item.path}><p className={router.pathname ===item.path ? Style.activeLink : Style.link} >{item.title}</p></Link>
                ))}
            </Stack>
        </Stack>
        
    )
}

export default Sidebar
