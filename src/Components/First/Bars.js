import Styles from "../../styles/First.module.css"
import React from "react"

const Bars = () => {
    return (
        <div className={Styles.bars_wrapper}>
            <div className={Styles.bars}></div>
            <div className={Styles.bars}></div>
            <div className={Styles.bars}></div>
            <div className={Styles.bars}></div>
            <div className={Styles.bars}></div>
            <div className={Styles.bars}></div>
        </div>
    )
}

export default Bars
