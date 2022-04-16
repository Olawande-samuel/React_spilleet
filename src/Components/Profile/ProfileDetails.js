import { Stack, Box } from "@mui/material";
import { useEffect, useState } from "react";
import style from "../../styles/ProfileSetting.module.css";
import { Items } from "../../Trials/Controller";

const ProfileDetails = ({ item }) => {
  const [id, setId] = useState({});
  useEffect(() => {
    let mounted = true;
    const data = localStorage.getItem("Spilleet_user");
    const user = JSON.parse(data);
    if (mounted) {
      setId(user);
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <Stack spacing={1} px={1}>
      <Box>
        <p style={{ fontWeight: "700", fontSize: "20px" }}>{item.fullname}</p>
      </Box>
      <Box>
        <p
          style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.4)" }}
          className={style.addProfile}
        >
          Add Profile Credentials
        </p>
      </Box>
      {/* <Box display="flex" justifyContent="space-between" alignItems="center" >
                <Box mr={2.5}>0 followers</Box>
                <Box><p>0 following</p></Box>
            </Box> */}
    </Stack>
  );
};

export default ProfileDetails;
