import {useTheme, useMediaQuery, FormControlLabel, Button, Checkbox, Grid, FormControl, Stack, Box, } from "@mui/material";
import { useFormik } from "formik";
import Style from "../../styles/Login.module.css";
import { Fetch } from "../../Trials/Controller";
import Utils from "../Utils/Utils";
import{ useEffect, useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { LoginContext } from "../Auth/User";
import Loader from "../Utils/Loader";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Google from "../../images/Google.svg";
import Logo from "../../images/Logo.svg"
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

  const [height, setHeight] = useState('')

  useEffect(()=>{
    const val = window.innerHeight;
    setHeight(val)
  },[])


  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const router = useNavigate();
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      setLoading(true)
      const formData = new FormData();
      formData.append("apptoken", "7FHS8S43N2JF08");
      formData.append("email", values.email);
      formData.append("pword", values.password);

      Fetch("https://spilleetapi.spilleet.com/login", formData)
        .then((res) => {
            setLoading(false)
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
            if(res.data.interests === true){
              router("/posts");
            }else {
              
            router("/interests");
            }
             
          }
        })
        .catch((err) => {
          setStatus("error");
          setContent(err.message);
          setShowAlert(true);
          setLoading(false)
        });
    },
  });

  
  return (
    <Box display="flex" minHeight={ matches ? `${height}px` : "100vh"}  justifyContent="center" alignItems="center" className={Style.loginContainer}>
      {loading === true? <Loader /> : (

      <Box item className={Style.loginContent}    p={2} >
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
              <label className={Style.label} htmlFor="email">Email address</label>
              <input
                style={{flex:"90%", padding:"12px 14px",  outline:"none" }}
                width="100%"
                id="email"
                name="email"
                type= "text"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={Style.pInput}
                />
            </FormControl>

            <FormControl>
              <label className={Style.label} htmlFor="password">Password</label>
              <Box display='flex' width="100%">
              <input
                style={{flex:"90%", padding:"12px 14px",  outline:"none" }}
                width="100%"
                id="password"
                name="password"
                type={showPassword ? "text" :"password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={Style.pInput}
                />
                <i style={{fontSize:"24px", flex:"5%",marginLeft:"-45px",   display:"flex", alignItems:"center", zIndex:"100", color:"rgb(133, 133, 133"}} onClick={handleShowPassword}>{showPassword ? <BsEyeSlash /> :<BsEye />}</i>

              </Box>

            </FormControl>
            <Grid container justifyContent="space-between" alignItems="center">
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
              <Button
                startIcon={
                  <img
                    src={Google}
                    alt="Google Logo"
                    width={24}
                    height={24}
                  />
                }
                sx={{ width: "100%", background: "#2D3748", fontWeight: "700" }}
                variant="contained"
                size="large"
              >
                Or sign-in with google
              </Button>
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
