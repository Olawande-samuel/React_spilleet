import { Stack, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Fetch } from "../../../Trials/Controller";
import Follower from "./Follower";
import Loader from "../../Utils/Loader";
const FollowersGroup = ({ data }) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setLoading(true);

      const formData = new FormData();
      formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
      formData.append("usertoken", data.usertoken);

      Fetch(`${process.env.REACT_APP_END_POINT}/list-my-followers`, formData)
        .then((res) => {
          setLoading(false);
          if (res.data.success !== false) {
            setFollowers(res.data);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    }
  }, [data]);
  return (
    <Stack width="100%">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box borderBottom="0.234px solid gray;">
            <p>{followers.length}</p>
          </Box>
          <Box>
            {followers.length > 0 &&
              followers.map((item) => <Follower key={item.id} item={item} />)}
          </Box>
        </>
      )}
    </Stack>
  );
};

export default FollowersGroup;
