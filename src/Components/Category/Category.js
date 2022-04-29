import { Box } from '@mui/material'
import React from 'react'
import CateCarou from './Carousel'
import Style from "../../styles/Carousel.module.css"
const Category = ({handleClick}) => {
    
    return (
        <Box mb={5} width="100%" display="flex" flexDirection="column" alignItems="center" >
            <h1 className={Style.category_label}>Category</h1>
            <CateCarou handleClick={handleClick} />
      </Box>
    )
}

export default Category
