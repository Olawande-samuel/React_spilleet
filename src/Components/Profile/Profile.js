import { Stack, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import EditProfile from "./EditProfile";
import Mid from "./Mid";
import Top from "./Top";
import style from "../../styles/ProfileSetting.module.css";
import { Fetch } from "../../Trials/Controller";
import { useParams } from "react-router-dom";

const Profile = () => {
  // const [user, setUser] = useState({})

  // useEffect(() => {
  //   if(data){
  //     setUser(data)
  //   }
  // }, [data])

  const [data, setData] = useState([]);
  const [usertoken, setUsertoken] = useState("");
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const close = () => {
    setShowAlert(false);
  };
  // const router = useRouter();
  const { name } = useParams();
  useEffect(() => {
    setLoading(true);
    if (name) {
      const separate = name.split("-");
      const token = separate.slice(-1);
      setUsertoken(token[0]);
      const formData = new FormData();
      formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
      formData.append("usertoken", token[0]);
      Fetch(`${process.env.REACT_APP_END_POINT}/getUserData`, formData)
        .then((res) => {
          setLoading(false);
          if (res.data.success === false) {
            return;
          } else {
            setData(res.data);
            localStorage.setItem("pers", res.data.usertoken);
          }
        })
        .catch((err) => {
          setLoading(false);
          setStatus("error");
          setContent(err.message);
          setShowAlert(true);
        });
    }
  }, [name]);
  return (
    <>
      {/* <Head>
        <meta name="description" content="Spilleet login page." />
        <meta name="keywords" content="Spilleet, Log in, login, sign in, spilleet login" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
        <title>Spilleet | {data.fullname}</title>
    </Head> */}
      <Stack className={style.mainContainer} pt={10} spacing={2}>
        <Box className={style.content}>
          <Top data={data} />
          <Mid data={data} />
        </Box>
      </Stack>
    </>
  );
};

export default Profile;
