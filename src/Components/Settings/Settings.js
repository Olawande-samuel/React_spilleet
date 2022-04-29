import { Grid, Box } from '@mui/material'
import Layout from '../Layout/Layout'
import React from 'react'
import Styles from "../../styles/Setting.module.css"
import Sidebar from './Sidebar/Sidebar'
const Settings = ({children}) => {
    return (
      
        <Box className={Styles.wrapper} mt={10}>
            <Grid container gap={4}>
                <Grid item pr={6} xs={0} md={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={12} md={8}>
                    {children}
                </Grid>
            </Grid>
        </Box>
       
    )
}

export default Settings
