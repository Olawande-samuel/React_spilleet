import React from 'react'
import {Box} from '@mui/material';
import Styles from "../../styles/Footer.module.css"
const Copy = () => {
    return (
        <Box>
           <Box className={Styles.content}>
               <Box className={Styles.creators}>
                    <p>Developed by <a href="https://fireswitch.tech">FireSwitch Tech</a></p>
               </Box>
               <Box className={Styles.copyright}>
                    <p style={{textAlign:"right"}}><a href="https://fireswitch.tech"> &copy; 2021 Spilleet </a></p>
               </Box>
           </Box>
        </Box>
    )
}

export default Copy
