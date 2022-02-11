import { Box } from '@mui/material'
import React from 'react'
import CateCarou from './Carousel'

const Category = ({handleClick}) => {
    return (
        <Box mb={5} width="100%" display="flex" flexDirection="column" alignItems="center" >
            <h1 style={{fontSize:"clamp(15px, 5vw, 34px)", alignSelf:"flex-start"}}>Category</h1>
            <CateCarou handleClick={handleClick} />
      </Box>
    )
}

export default Category
