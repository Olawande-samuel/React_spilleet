import React, { useState, useEffect } from "react";
import { Stack, Box } from "@mui/material";
import { useFormik } from "formik";
import style from "../../../styles/Manage.module.css";
import Usertable from "./table/Usertable";
import Utils from "../../Utils/Utils";
import { Fetch } from "../../../Trials/Controller";
import Loader from "../../Utils/Loader";
const AdminUser = () => {
  const [display, setDisplay] = useState(false);
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const close = () => {
    setShowAlert(false);
  };
  const [loading, setLoading] = useState(false);

  const { qValue, setValue } = useState("");
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("admin");

    if (data) {
      setUserObj(JSON.parse(data));
    }
  }, []);


  const handleSwitch = (e) => {
    e.preventDefault();
    setDisplay(!display);
  };
  const formik = useFormik({
    initialValues: {
      // username: "",
      email: "",
      password: "",
     
    },
    onSubmit: async (values) => {
      setLoading(true)
      const formData = new FormData();
      formData.append("apptoken", "7FHS8S43N2JF08");
      formData.append("admintoken", userObj.admintoken);
      formData.append("email", values.email);
      formData.append("password", values.password);
     
      Fetch("https://spilleetapi.spilleet.com/add-admin", formData)
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
          }
        })
        .catch((err) => {
          setLoading(false)
          setStatus("error");
          setContent(err.message);
          setShowAlert(true);
        });
    },
  });
  return (
    <Stack className={style.admin_container}>
      <Box mt={1}>
              {showAlert && (
                <Utils status={status} content={content} handleAlert={close} />
              )}
        </Box>
      <Box display="flex" gap="5px">
        <button
          className={display === false ? style.admin_false : style.admin_btn}
          onClick={handleSwitch}
        >
          Add Admin
        </button>
        <button
          className={display === true ? style.admin_true : style.admin_btn}
          onClick={handleSwitch}
        >
          Manage Admin
        </button>
      </Box>
      <Box>
        {display === true ? (
          <Box>
            <h2 className={style.admin_title}>Manage Admin</h2>
            <Box width="100%" style={{overflowX:"scroll"}}>
              <table className={style.table}>
                <thead>
                  <tr className={style.thead_row}>
                    <th>N</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <Usertable />
                </tbody>
              </table>
            </Box>
          </Box>
        ) : (
          <Box>
            <form className={style.form} onSubmit={formik.handleSubmit}>
              <h2 className={style.admin_title}>Create user admin</h2>
              { loading ? (
                <Box
                  height="90%"
                  width="100%"
                  display="grid"
                  placeItems="center"
                >
                  <Loader />
                </Box>
              ) : (
                  <>
                
                <div className={style.form_group}>
                <label htmlFor="email" className={style.form_label}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={style.form_input} 
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <div className={style.form_group}>
                <label htmlFor="password" className={style.form_label}>
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  className={style.form_input} 
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  
                  />
              </div>
              
              <div>
                <button className={style.admin_btn} type="submit">Save Admin</button>
              </div>
              </>
            )}
            </form>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default AdminUser;
