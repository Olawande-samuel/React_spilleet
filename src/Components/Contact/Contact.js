import { Grid, Stack, Box, useTheme } from "@mui/material";
import Imageholder from "Components/First/Imageholder";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { BsFillTelephoneFill, BsFacebook } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { MdLocationOn } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import Style from "../../styles/Contact.module.css";
import {useState, useEffect} from "react"
// import Image from 'next/image';
const Contact = () => {
const [height, setHeight] = useState('')
  useEffect(()=>{
    const val = window.innerHeight;
    setHeight(val)
  },[])
  const formik = useFormik({
    initialValues: {
      name: "",
      mail: "",
      message: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Grid container backgroundColor="rgba(38, 28, 255, 1)" minHeight={`${height}px`} padding={matches ? "10px 20px":"20px 82px"}>
      <Grid item md={6} >
        <Stack color="#fff" px={1} pt={2} display="flex"  height="100%" spacing={2} >
         <Box mb={6}>
          <div className={Style.logo}>
            <Link to="/">
                <img src="/Logo.svg" alt="App Logo" width={160} height={48} />
            </Link>
          </div>
          <div className={Style.text}>
            <p>
              Get Us in Touch. Fill up the form and our Team will get back to
              you within 24 hours.
            </p>
          </div>
         </Box>
          <Box display="flex"justifyContent="center" alignItems="center">
            <Stack spacing={2}> 
              <div className={Style.contactLink}> 
                <span>
                <BsFillTelephoneFill  />
                </span> <span>+234 814 536 3728</span> 
              </div>
              <div className={Style.contactLink}> 
                <span>
                    <IoMdMail />
                </span>
                <span>
                  <a href="maiito:itSpilleet@gmail.com">itSpilleet@gmail.com</a>
                </span>
              </div>
              <div className={Style.contactLink}>
                <span>
                    <MdLocationOn />    
                </span> <span>102 Orogun Street, Ibadan</span>
              </div>
              <div>
                <div className={Style.socials}>
                  <span className="instagram">
                  <FaInstagram />
                  </span>
                  <span className="facebook">
                  <BsFacebook />
                  </span>
                  <span className="linkedin">
                  <TiSocialLinkedinCircular />
                  </span>
                </div>
              </div>
            </Stack>
          </Box>
        </Stack>
      </Grid>
      <Grid item md={6} display="flex" justifyContent="center" width="100%" >
        <Box padding={matches ? "40px 0px":"76px"} width={matches ? "100%":"unset"}    >
          <form className={Style.form} >
            <Stack spacing={2}>
            <Stack spacing={1}>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={Style.input}
              />
            </Stack>
            <Stack spacing={1}>
              <label htmlFor="mail">Email</label>
              <input
                type="mail"
                name="mail"
                id="mail"
                value={formik.values.mail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={Style.input}
              />
            </Stack>
            <Stack spacing={1}>
              <label htmlFor="name">Message</label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                placeholder="Write message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={Style.input}

              ></textarea>
            </Stack>
            <div className={Style.buttonWrapper}>
                <button className={Style.button}>Send message</button>
            </div>
            </Stack>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Contact;
