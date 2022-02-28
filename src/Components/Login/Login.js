import {
  useTheme,
  useMediaQuery,
  FormControlLabel,
  Button,
  Checkbox,
  Grid,
  FormControl,
  Stack,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import Style from "../../styles/Login.module.css";
import { Fetch } from "../../Trials/Controller";
import Utils from "../Utils/Utils";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoginContext } from "../Auth/User";
import Loader from "../Utils/Loader";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Google from "../../images/Google.svg";
import Logo from "../../images/Logo2.png";
import GoogleLogin from "react-google-login";
const Login = () => {
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const close = () => {
    setShowAlert(false);
  };
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const {setUser} = useContext(LoginContext);

  const [height, setHeight] = useState("");

  useEffect(() => {
    const val = window.innerHeight;
    setHeight(val);
  }, []);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useNavigate();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
      formData.append("email", values.email);
      formData.append("pword", values.password);

      Fetch(`${process.env.REACT_APP_END_POINT}/login`, formData)
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
            if (res.data.interests === true) {
              router("/posts");
            } else {
              router("/interests");
            }
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
    <Box
      display="flex"
      minHeight={matches ? `${height}px` : "100vh"}
      justifyContent="center"
      alignItems="center"
      className={Style.loginContainer}
    >
      {loading === true ? (
        <Loader />
      ) : (
        <Box item className={Style.loginContent} p={2}>
          <div className={Style.logoWrapper}>
            <Link to="/">
              <img src={Logo} alt="App Logo" width={264} height={96} />
            </Link>
          </div>
          {showAlert && (
            <Utils status={status} content={content} handleAlert={close} />
          )}
          <form onSubmit={formik.handleSubmit}>
            <p>Welcome back</p>
            <h2 className={Style.header}>Login to your account </h2>
            <Stack gap={1}>
              <FormControl>
                <label className={Style.label} htmlFor="email">
                  Email address
                </label>
                <input
                  style={{ flex: "90%", padding: "12px 14px", outline: "none" }}
                  width="100%"
                  id="email"
                  name="email"
                  type="text"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={Style.pInput}
                />
              </FormControl>

              <FormControl>
                <label className={Style.label} htmlFor="password">
                  Password
                </label>
                <Box display="flex" width="100%">
                  <input
                    style={{
                      flex: "90%",
                      padding: "12px 14px",
                      outline: "none",
                    }}
                    width="100%"
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={Style.pInput}
                  />
                  <i
                    style={{
                      fontSize: "24px",
                      flex: "5%",
                      marginLeft: "-45px",
                      display: "flex",
                      alignItems: "center",
                      zIndex: "100",
                      color: "rgb(133, 133, 133",
                    }}
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </i>
                </Box>
              </FormControl>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={12} sm={7}>
                  <FormControl>
                    <FormControlLabel
                      InputProps={{ className: Style.input }}
                      control={<Checkbox />}
                      label="Remember me"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={5} textAlign="right">
                  <Link to="/forgot-password">
                    <a className={Style.forgot}>Forgot Password?</a>
                  </Link>
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
                  sx={{ width: "100%", fontWeight: "700" }}
                  variant="contained"
                  size="large"
                  className={Style.loginBtn}
                >
                  Login now
                </Button>
                {/* <div style={{ width: "100%" }}>
                  <GoogleLogin
                  clientId="911941167655-cj24vikbi8d7pj6hskd6ipqbqu2im8nu.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        className={Style.google_login}
                      >
                        <div
                          style={{
                            marginRight: "10px",
                            background: "rgb(255, 255, 255)",
                            padding: "5px",
                            borderRadius: "2px",
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g fill="#000" fill-rule="evenodd">
                              <path
                                d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
                                fill="#EA4335"
                              ></path>
                              <path
                                d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
                                fill="#4285F4"
                              ></path>
                              <path
                                d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
                                fill="#FBBC05"
                              ></path>
                              <path
                                d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
                                fill="#34A853"
                              ></path>
                              <path fill="none" d="M0 0h18v18H0z"></path>
                            </g>
                          </svg>
                        </div>
                        <span> Or sign-in with Google</span>
                      </button>
                    )}
                    className="google_login"
                    buttonText="Or sign-in with Google"
                  />
                </div> */}
              </Grid>
              <div>
                <p className={Style.join}>
                  Don&lsquo;t have an account?{" "}
                  <span className={Style.forgot}>
                    <Link to="/signup">Join free today</Link>
                  </span>
                </p>
              </div>
            </Stack>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default Login;
