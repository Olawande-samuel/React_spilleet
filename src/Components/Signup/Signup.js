import {
  Button,
  Checkbox,
  Typography,
  FormControl,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Box,
} from "@mui/material";
import react, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import Style from "../../styles/Signup.module.css";
import Utils from "../Utils/Utils";
import { Fetch } from "../../Trials/Controller";
import Loader from "../Utils/Loader";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Logo from "../../images/Logo2.png";
import Google from "../../images/Google.svg";
import Facebook from "../../images/facebook.svg";
import * as Yup from "yup";
const Signup = () => {
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const close = () => {
    setShowAlert(false);
  };
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowCPassword = () => {
    setShowCPassword(!showCPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
      formData.append("email", values.email);
      formData.append("pword", values.password);
      formData.append("cpword", values.cpassword);
      formData.append("phone", values.phone);
      formData.append("fullname", values.name);
      // formData.append("username", values.username)

      Fetch(`${process.env.REACT_APP_END_POINT}/register`, formData)
        .then((res) => {
          setLoading(false);
          if (res.data.success === false) {
            setStatus("error");
            setContent(res.data.message);
            setShowAlert(true);
          } else if(res.data.success === true) {
            setStatus("success");
            setContent(res.data.message);
            setShowAlert(true);
          } else {
            setStatus("error");
            setContent(res.data);
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
    <Grid
      container
      pt={2}
      pb={3}
      className={Style.wrapper}
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
    >
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <Grid item xs={12} className={Style.logo}>
            <Link to="/">
              <div className={Style.logoWrapper}>
                <img src={Logo} alt="App Logo" width={160} height="auto" />
              </div>
            </Link>
          </Grid>
          <Grid item pr={2} xs={12}>
            <p className={Style.header}>
              Already a member?
              <span>
                <Link to="/login">Sign in</Link>
              </span>
            </p>
          </Grid>
          <Grid item md={6} px={1}>
            {showAlert && (
              <Utils status={status} content={content} handleAlert={close} />
            )}
            <h2>Sign up to Spilleet</h2>
            <Grid
              container
              mb={3}
              justifyContent="flex-start"
              alignItems="center"
              gap={1}
            >
              <Grid item width="100%">
                <Link to="/login">
                  <Button
                    type="submit"
                    sx={{
                      width: "100%",
                      background: "#3F96D4",
                      fontWeight: "700",
                    }}
                    variant="contained"
                    size="large"
                  >
                    Login now
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Grid
              container
              mb={3}
              justifyContent="flex-start"
              alignItems="center"
              gap={1}
            >
              <Grid item xs={12}>
                <p className={Style.or}>
                  <span>Or</span>
                </p>
              </Grid>
            </Grid>
            <Grid container>
              <form onSubmit={formik.handleSubmit}>
                <Stack gap={2}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={12}  mb={1}>
                      <FormControl sx={{ width: "100%" }}>
                        <label htmlFor="name" className={Style.label}>
                          Preferred Name
                        </label>
                        <TextField
                          id="name"
                          name="name"
                          size="small"
                          variant="outlined"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          InputProps={{ className: Style.input }}
                        />
                      </FormControl>
                    </Grid>
                    {/* <Grid item xs={12} md={5} mb={1}>
                      <FormControl sx={{ width: "100%" }}>
                        <label htmlFor="phone" className={Style.label}>
                          Phone
                        </label>
                        <TextField
                          id="phone"
                          name="phone"
                          size="small"
                          type="number"
                          variant="outlined"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          InputProps={{ className: Style.input }}
                        />
                      </FormControl>
                      {formik.touched.phone ? (
                        <small style={{ color: "red" }}>
                          Your phone number and email address will not be made
                          public
                        </small>
                      ) : null}
                    </Grid> */}
                  </Grid>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <FormControl sx={{ width: "100%" }}>
                        <label htmlFor="email" className={Style.label}>
                          Email Address
                        </label>
                        <TextField
                          id="email"
                          name="email"
                          sx={{ width: "100%" }}
                          size="small"
                          variant="outlined"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          InputProps={{ className: Style.input }}
                        />
                      </FormControl>
                      {formik.touched.email && formik.errors.email ? (
                        <small style={{ color: "red" }}>
                          {formik.errors.email}
                        </small>
                      ) : null}
                      {formik.touched.email ? (
                        <p>
                        <small style={{ color: "green" }}>
                          Your email address will not be made
                          public
                        </small>
                        </p>
                      ) : null}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={12} mb={1}>
                      <FormControl sx={{ width: "100%" }}>
                        <label htmlFor="password" className={Style.label}>
                          Password
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
                    <Grid item xs={12} mb={1}>
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
                  </Grid>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <FormControl>
                        <FormControlLabel
                          sx={{ fontSize: "12px !important" }}
                          control={
                            <Checkbox
                              name="agreement"
                              value={formik.values.agreement}
                            />
                          }
                          label={
                            <Typography className={Style.check}>
                              Creating an account means you&apos;re ok with
                              Terms of Service, Privacy Policy and our default
                              Notification Settings.
                            </Typography>
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                  >
                    <Button
                      type="submit"
                      sx={{ background: "#FF2929", fontWeight: "700" }}
                      variant="contained"
                      size="large"
                    >
                      Create Account
                    </Button>
                  </Grid>
                  <Typography className={Style.check}>
                    This site is protected by reCAPTCHA and the google{" "}
                    <span>
                      <Link to="/Privacy">Privacy Policy</Link>
                    </span>{" "}
                    and the{" "}
                    <span>
                      <Link to="/terms">Terms of Service</Link>
                    </span>{" "}
                    apply
                  </Typography>
                </Stack>
              </form>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Signup;
