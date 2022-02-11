import { Box } from '@mui/material'
import React from 'react'
import style from "../../styles/First.module.css";
import SittingLeft from "../../images/sitting-left.png"
import SittingRight from "../../images/sitting-right.png"
const Images = () => {
    return (
        <Box alignSelf="flex-end" display="flex" alignItems="flex-end">
            <div className={style.left}>
                <img src={SittingLeft} alt="random icon" />
            </div>
            <div className={style.right}>
                <img src={SittingRight} alt="random icon" />  
            </div>
        </Box>
    )
}

export default Images
