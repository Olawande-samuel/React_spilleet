import { Grid, Box, Stack } from "@mui/material";
import ProfileDetails from "./ProfileDetails";
import ProfileImg from "./ProfileImg";
import EditBar from "./EditBar";
import {useState, useEffect} from "react"

const Top = ({data}) => {
  const [id, setId]= useState("")
  useEffect(()=>{
    const person = localStorage.getItem("user");
    if(person) {
      const user = JSON.parse(person);
      setId(user.usertoken)
    }

  },[])
  return (
    <Stack spacing={1} display="flex" justifyContent="center">
      <Grid container justifyContent="center">
        <Grid item md={3} display="flex" justifyContent="center">
          <ProfileImg picture={data.imgurl} />
        </Grid>
        <Grid
          item
          md={6}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" justifyContent="space-between" width="100%">
            <ProfileDetails item={data} />
            {/* <Box
              backgroundColor="#C4C4C4"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="50%"
              width={20}
              height={20}
            >
              <img src="/share.svg" alt="" width={9} height={9} />
            </Box> */}
          </Box>
        </Grid>
      </Grid>
      {data.usertoken === id ? <EditBar /> : "" }
    </Stack>
  );
};

export default Top;
