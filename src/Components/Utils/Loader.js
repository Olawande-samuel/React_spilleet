import React from "react"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
    return (
        <Box sx={{ display: 'flex' }}  justifyContent="center" alignItems="center">
            <CircularProgress sx={{color:"#C035A2"}} />
        </Box>
    )
}

export default Loader;
