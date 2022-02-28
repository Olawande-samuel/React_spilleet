import React, { useState, useEffect } from "react";
import { Box, Grid, Divider } from "@mui/material";
import Toggle from "../../Switch/Switch";
import Style from "../../../styles/Setting.module.css";
import { Link, useNavigate } from "react-router-dom";
import ProfileImg from "../../Profile/ProfileImg";
import Profile from "../../Navbar/Profile";
import { Fetch } from "../../../Trials/Controller";
import Loader from "../../Utils/Loader";
import Utils from "../../Utils/Utils";
import EditProfile from "../../Profile/EditProfile";

export const Account = () => {
  const [toggleOpen, setToggleOpen] = useState(false);

  const openModal = () => {
    setToggleOpen(true);
  };
  const closeModal = () => {
    setToggleOpen(false);
  };

  const router = useNavigate();
  const [name, setName] = useState({
    fullname: "",
    phone: "",
  });

  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const close = () => {
    setShowAlert(false);
  };

  const [loading, setLoading] = useState(false);
  const [edited, setEdited] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    router("/");
  };
  const handleChange = (e) => {
    setEdited(true);
    setName({ ...name, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data) {
      const user = JSON.parse(data);
      setName({
        ...name,
        fullname: user.fullname,
        usertoken: user.usertoken,
        phone: user.phone,
        email: user.email,
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    formData.append("fullname", name.fullname);
    formData.append("phone", name.phone);
    formData.append("usertoken", name.usertoken);

    // formData.append("username", values.username)

    Fetch(`${process.env.REACT_APP_END_POINT}/update-profile`, formData)
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
      })
      .finally(() => setLoading(false));
  };
  if (loading === true) {
    return <Loader />;
  }
  return (
    <form>
      {showAlert && (
        <Utils status={status} content={content} handleAlert={close} />
      )}
      <div className={Style.title}>Account Settings</div>
      <Divider />
      <Box>
        <Grid
          container
          justifyContent="space-between"
          py={2}
          alignItems="center"
        >
          <Grid item xs={4} md={6}>
            <p className={Style.text}>Profile Image</p>
          </Grid>
          <Grid item xs={8} md={6} display="flex" alignItems="center">
            <Box mr={2}>
              <Profile />
            </Box>
            <p className={Style.linkText} onClick={openModal}>
              Change profile image
            </p>
          </Grid>
        </Grid>
        <Divider />

        <Grid
          container
          justifyContent="space-between"
          py={2}
          alignItems="center"
        >
          <Grid item xs={4} md={6}>
            <p className={Style.text}>Name</p>
          </Grid>
          <Grid item xs={8} md={6}>
            <input
              id="name"
              name="fullname"
              type="text"
              value={name.fullname}
              onChange={handleChange}
              className={Style.input}
            />
          </Grid>
        </Grid>
        <Divider />
        <Grid
          container
          justifyContent="space-between"
          py={2}
          alignItems="center"
        >
          <Grid item xs={4} md={6}>
            <p className={Style.text}>Phone no</p>
          </Grid>
          <Grid item xs={8} md={6}>
            <input
              id="phone"
              name="phone"
              type="phone"
              value={name.phone}
              onChange={handleChange}
              className={Style.input}
            />
          </Grid>
        </Grid>
        <Divider />

        <Grid
          container
          justifyContent="space-between"
          py={2}
          alignItems="center"
        >
          <Grid item xs={4} md={6}>
            <p className={Style.text}>Email</p>
          </Grid>
          <Grid item xs={8} md={6}>
            <p className={Style.textValue}>
              {name.email}{" "}
              <span className={Style.secondaryText}>Primary Email</span>{" "}
            </p>
            <p className={Style.linkText}>Add Another Email Address</p>
          </Grid>
        </Grid>
        <Divider />
        <Grid
          container
          justifyContent="space-between"
          py={2}
          alignItems="center"
        >
          <Grid item xs={4} md={6}>
            <p className={Style.text}>Password</p>
          </Grid>
          <Grid item xs={8} md={6}>
            <Link to="/user/change-password">
              <p className={Style.linkText}>Change Password</p>
            </Link>
          </Grid>
        </Grid>
        <Divider />
        <Grid
          container
          justifyContent="space-between"
          py={2}
          alignItems="center"
        >
          <Grid item xs={4} md={6}>
            <p className={Style.text}>Logout</p>
          </Grid>
          <Grid item xs={8} md={6}>
            <p className={Style.linkText} onClick={handleLogout}>
              Logout
            </p>
          </Grid>
        </Grid>
        <Divider />

        <Grid
          container
          justifyContent="space-between"
          py={2}
          alignItems="center"
        >
          <Grid item xs={4} md={6}>
            <p className={Style.text}>Login security</p>
          </Grid>
          <Grid item xs={8} md={6} display="flex" alignItems="center" gap={2}>
            <span className={Style.textValue}>Require email verification</span>{" "}
            <span>
              <Toggle />
            </span>
          </Grid>
        </Grid>
        <Divider />
      </Box>
      <Box mt={6}>
        <div className={Style.bottom_title}>
          <p className={Style.text}>Connected Accounts &amp; Contacts</p>
        </div>
        <Divider />
        <Grid
          container
          justifyContent="space-between"
          py={2}
          alignItems="center"
        >
          <Grid item xs={6} display="flex" alignItems="center" gap={1}>
            <button
              className={edited ? Style.btn : Style.disabledBtn}
              disabled={edited === true ? false : true}
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </Grid>
        </Grid>
        <EditProfile
          handleOpen={openModal}
          handleClose={closeModal}
          open={toggleOpen}
        />
      </Box>
    </form>
  );
};
