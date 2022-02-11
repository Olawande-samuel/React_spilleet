import { Grid, Stack } from "@mui/material"
import Bars from "./Bars"
import Imageholder from "./Imageholder"
import Other from "./Other"
import style from "../../styles/Imageholder.module.css"
const First = ({children}) => {
    return (
       <Grid container minHeight="100vh" >
           <Grid item className={style.imageHolder}  xs={5} sm={4} >
            <Imageholder  />
           </Grid>
            <Grid  item xs={12} sm={8} justifyContent="center" alignItems="center"> {children} </Grid>
       </Grid>
    )
}

export default First
