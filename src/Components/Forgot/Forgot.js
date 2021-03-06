import { Box, Button, FormControl, Stack, TextField } from "@mui/material";
import Loader from "../Utils/Loader";
import Utils from "../Utils/Utils";
import React, { useState, useEffect } from "react";
import { Fetch } from "../../Trials/Controller";
import Style from "../../styles/Changepassword.module.css";
import { Link } from "react-router-dom";
import Logo from "../../images/Logo2.png";
const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const  [height, setHeight] = useState("")
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const close = () => {
    setShowAlert(false);
  };

  const handleSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    formData.append("email", email);
    Fetch(`${process.env.REACT_APP_END_POINT}/forgot-password`, formData)
      .then((res) => {
        setLoading(false);
        if (res.data.success === false) {
          setStatus("error");
          setContent(res.data.message);
          setShowAlert(true);
        } else {
          setStatus("success");
          setContent(res.data.message);
          setShowAlert(true);
          //   router.push("/posts");
        }
      })
      .catch((err) => {
        setStatus("error");
        setContent(err.message);
        setShowAlert(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    const val = window.innerHeight;
    setHeight(val);
  
    
  }, [])
  
  return (
    <Box
      width="100%"
      height={height}
      backgroundColor="#fff"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      paddingTop="1rem"
      color="#C035A2"
    >
      <Box width="100%" className={Style.logo}>
        <Link to="/">
          <div className={Style.logoWrapper}>
            <img src={Logo} alt="App Logo" width={164} height={56} />
          </div>
        </Link>
      </Box>
      <form
        className={Style.forgotForm}
        style={{
          height: "80%",
          backgroundColor: "white",
          display: "grid",
          placeItems: "center",
          margin: "auto",
        }}
      >
        {showAlert && (
          <Utils status={status} content={content} handleAlert={close} />
        )}
        {loading ? (
          <Loader />
        ) : (
          <Stack spacing={2}>
            <h2 style={{ textAlign: "center" }}>Forgot Password</h2>
            <FormControl>
              <label htmlFor="name">Email</label>
              <TextField
                id="email"
                name="email"
                size="small"
                type="email"
                variant="outlined"
                value={email}
                onChange={handleChange}
                // InputProps={{ className: Style.input }}
              />
            </FormControl>
            <Box>
              <Button sx={{background:"#C035A2"}} variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Stack>
        )}
      </form>
    </Box>
  );
};

export default Forgot;
