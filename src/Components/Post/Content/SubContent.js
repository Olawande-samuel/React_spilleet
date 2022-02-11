import React from 'react'
import Style from "../../../styles/SubComments.module.css";
const SubContent = ({children, content}) => {
    return (
        <div className={Style.subContent}>
            <div>{children}</div>
           <p style={{fontSize:"14px"}} dangerouslySetInnerHTML={{ __html: content }} /> 
        </div>
    )
}

export default SubContent
