import { useNavigate, Link, useParams } from "react-router-dom";
import react, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Loader from "../Utils/Loader";
import Utils from "../Utils/Utils";
import { Fetch } from "../../Trials/Controller";
const Authenticate = () => {
  const router = useNavigate();

  const { token } = useParams();
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const close = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    let mounted = true;
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    formData.append("usertoken", token);

    Fetch(`${process.env.REACT_APP_END_POINT}/activate-account`, formData)
      .then((res) => {
        if (mounted) {
          if (res.data.success === false) {
            setStatus("error");
            setContent(res.data.message);
            setShowAlert(true);
          } else {
            setStatus("success");
            setContent(res.data.message);
            setShowAlert(true);
            setTimeout(() => {
              router("/login");
            }, 1000);
          }
        }
      })
      .catch((err) => {
        setStatus("error");
        setContent(err.message);
        setShowAlert(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (showAlert)
    return (
      <Stack
        height="100vh"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Box width="80%" mx="auto">
          <Utils status={status} content={content} handleAlert={close} />
        </Box>
        <Box>
          <p>
            <span>Go</span> <Link to="/">Home</Link>{" "}
          </p>
        </Box>
      </Stack>
    );
  return (
    <Stack
      height="100vh"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Loader />
    </Stack>
  );
};

export default Authenticate;
