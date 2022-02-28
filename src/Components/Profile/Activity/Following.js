import { Stack, Box } from "@mui/material";
import { Context, Fetch } from "../../../Trials/Controller";
import Follower from "./Follower";
import { useState, useEffect } from "react";
import Loader from "../../Utils/Loader";
const Following = ({ data }) => {
  // const {followers }  = useContext(Context)
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setLoading(true);
      const formData = new FormData();
      formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
      formData.append("usertoken", data.usertoken);

      Fetch(`${process.env.REACT_APP_END_POINT}/list-my-followings`, formData)
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
    <Stack>
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

export default Following;
