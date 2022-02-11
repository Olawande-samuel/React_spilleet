// @ts-nocheck
import React from "react"
import style from "../../../../styles/Manage.module.css"
const Tabledata = () => {
    return (
        <tr>
           <td>1</td> 
           <td>Why Spilleet is the biggest social app from Africa</td> 
           <td>James</td> 
           <td>
                <div className={style.action}>
                    <button className={style.post_edit}>Edit</button>
                    <button className={style.post_remove}>Remove</button>
                    <button className={style.post_publish}>Publish</button>
                </div>
            </td> 
        </tr>
    )
}

export default Tabledata
