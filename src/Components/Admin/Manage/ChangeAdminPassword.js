import { Grid, TextField, Box, FormControl } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Style from "../../../styles/Changepassword.module.css";
import { Fetch } from "../../../Trials/Controller";
import Loader from "../../Utils/Loader";
import Utils from "../../Utils/Utils";
import { Link } from "react-router-dom";
import Logo from "../../../images/Logo2.png";

const ChangeAdminPassword = () => {
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const close = () => {
    setShowAlert(false);
  };

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [usertoken, setUsertoken] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    const val = window.innerHeight;
    setHeight(val);
    const data = localStorage.getItem("admin");

    if (data) {
      const user = JSON.parse(data);
      setUsertoken(user.admintoken);
    }
  }, []);
  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowCPassword = () => {
    setShowCPassword(!showCPassword);
  };

  const formik = useFormik({
    initialValues: {
      oPassword: "",
      password: "",
      cpassword: "",
    },

    onSubmit: (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
      formData.append("admintoken", usertoken);
      formData.append("opword", values.oPassword);
      formData.append("npword", values.password);
      formData.append("cpword", values.cpassword);

      // formData.append("username", values.username)

      Fetch(`${process.env.REACT_APP_END_POINT}/adminChangePassword`, formData)
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
          }
        })
        .catch((err) => {
          setStatus("error");
          setContent(err.message);
          setShowAlert(true);
          setLoading(false);
        });
    },
  });

  return (
    <Box className={Style.wrapper} height={height}>
      <Box width="100%" className={Style.logo}>
        <Link to="/">
          <div className={Style.logoWrapper}>
            <img src={Logo} alt="App Logo" width={164} height={56} />
          </div>
        </Link>
      </Box>
        {loading ? (
          <Loader />
        ) : (
      <form className={Style.form} onSubmit={formik.handleSubmit}>
        <h2>Change Password</h2>

          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            gap={1}
          > 
          <Box display="flex" justifyContent="center" width="100%">
            {showAlert && (
              <Utils status={status} content={content} handleAlert={close} />
            )}
          </Box>

            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <label htmlFor="password" className={Style.label}>
                  Current Password
                </label>
                <Box width="100%" display="flex" alignItems="center">
                  <TextField
                    id="oPassword"
                    name="oPassword"
                    type={showOldPassword ? "text" : "password"}
                    sx={{ width: "100%" }}
                    size="small"
                    variant="outlined"
                    value={formik.values.oPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputProps={{ className: Style.input }}
                  />
                  <i
                    style={{
                      fontSize: "24px",
                      marginLeft: "-40px",
                      display: "flex",
                      alignItems: "center",
                      zIndex: "100",
                      color: "rgb(133, 133, 133",
                    }}
                    onClick={handleClickShowOldPassword}
                  >
                    {showOldPassword ? <BsEyeSlash /> : <BsEye />}
                  </i>
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <label htmlFor="password" className={Style.label}>
                  New Password
                </label>
                <Box width="100%" display="flex" alignItems="center">
                  <TextField
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    sx={{ width: "100%" }}
                    size="small"
                    variant="outlined"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputProps={{ className: Style.input }}
                  />
                  <i
                    style={{
                      fontSize: "24px",
                      marginLeft: "-40px",
                      display: "flex",
                      alignItems: "center",
                      zIndex: "100",
                      color: "rgb(133, 133, 133",
                    }}
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </i>
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <label htmlFor="cpassword" className={Style.label}>
                  Confirm Password
                </label>
                <Box display="flex" alignItems="center">
                  <TextField
                    id="cpassword"
                    name="cpassword"
                    type={showCPassword ? "text" : "password"}
                    sx={{ width: "100%" }}
                    size="small"
                    variant="outlined"
                    value={formik.values.cpassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputProps={{ className: Style.input }}
                  />
                  <i
                    style={{
                      fontSize: "24px",
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "-40px",
                      zIndex: "100",
                      color: "rgb(133, 133, 133",
                    }}
                    onClick={handleClickShowCPassword}
                  >
                    {showCPassword ? <BsEyeSlash /> : <BsEye />}
                  </i>
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <button className={Style.btn}>Submit</button>
            </Grid>
          </Grid>
      </form>
        )}
    </Box>
  );
};
export default ChangeAdminPassword;
