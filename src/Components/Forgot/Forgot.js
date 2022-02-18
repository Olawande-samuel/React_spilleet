import {
  Box,
  Button,
  FormControl,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import Loader from "../Utils/Loader";
import Utils from "../Utils/Utils";
import React, { useState } from "react";
import { Fetch } from "../../Trials/Controller";
import Style from "../../styles/Changepassword.module.css";
import { Link } from "react-router-dom";
import Logo from "../../images/Logo.svg"
const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const close = () => {
    setShowAlert(false);
  };

  const handleSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("apptoken", "7FHS8S43N2JF08");
    formData.append("email", email);
    Fetch("https://spilleetapi.spilleet.com/forgot-password", formData)
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
          let user = JSON.stringify(res.data);
          localStorage.setItem("user", user);
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

  return (
    <Box
      width="100%"
      height="100vh"
      backgroundColor="#C035A2"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box width="100%" className={Style.logo}>
        <Link to="/">
          <div className={Style.logoWrapper}>
            <img src={Logo} alt="App Logo" width={264} height={96} />
          </div>
        </Link>
      </Box>
      <form
        className={Style.forgotForm}
        style={{
          height: "40%",
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
              <Button variant="contained" onClick={handleSubmit}>
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
