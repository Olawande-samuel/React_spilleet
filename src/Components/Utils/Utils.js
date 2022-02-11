import { Alert } from "@mui/material"
import React from "react"
const Utils = ({content, handleAlert, status}) => {
    return (
        <Alert severity={status} onClose={handleAlert}>{content}</Alert>
    )
}

export default Utils
