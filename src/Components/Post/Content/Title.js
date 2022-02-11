import { fontFamily } from '@mui/system'
import React from 'react'
import style from "../../../styles/TextPost.module.css"
const Title = ({title}) => {
    return (
          <h3 style={{ padding:"0", marginBottom:"0", marginTop:"3px"}} className={style.previewTitle} dangerouslySetInnerHTML={{ __html: title }} />
           
    )
}
export default Title
