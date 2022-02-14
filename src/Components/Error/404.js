import React from "react"
import {Box} from "@mui/material"
import {Link} from "react-router-dom"
const NotFound = () =>{
    return(
        <Box display="flex" height="100vh" flexDirection="column" alignItems="center" justifyContent="center">
            <h1>That page does not exist</h1>
            <Link to="/">Go Home</Link>
        </Box>
    )
}  

export default NotFound