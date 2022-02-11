import React, { useState, useEffect } from "react";
import { Stack, Box } from "@mui/material";
import { useFormik } from "formik";
import style from "../../../styles/Manage.module.css";
import Usertable from "./table/Usertable";
import Utils from "../../Utils/Utils";
import { Fetch } from "../../../Trials/Controller";
import Loader from "../../Utils/Loader";
const Topics = () => {
  const [display, setDisplay] = useState(false);
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const close = () => {
    setShowAlert(false);
  };
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
      title: "",
      topic: "",
      body: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("apptoken", "7FHS8S43N2JF08");
      formData.append("admintoken", userObj.admintoken);
      formData.append("ctg_name", values.name);
      formData.append("description", values.desc);

      Fetch("https://spilleetapi.spilleet.com/create-category", formData)
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
          setLoading(false);

          setStatus("error");
          setContent(err.message);
          setShowAlert(true);
        });
    },
  });

  return (
    <Stack className={style.admin_container}>
      <Box display="flex" gap="5px">
        <button
          className={display === false ? style.admin_false : style.admin_btn}
          onClick={handleSwitch}
        >
          Add Topic
        </button>
        <button
          className={display === true ? style.admin_true : style.admin_btn}
          onClick={handleSwitch}
        >
          Manage Topics
        </button>
      </Box>
      <Box>
        {display === true ? (
          <Box overflow="scroll">
            <h2 className={style.admin_title}>Manage Topics</h2>
            <Box width="100%" style={{ overflowX: "scroll" }}>
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
              <Box mt={1}>
                {showAlert && (
                  <Utils
                    status={status}
                    content={content}
                    handleAlert={close}
                  />
                )}
              </Box>
              <h2 className={style.admin_title}>Create Topics</h2>
              {loading ? (
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
                    <label htmlFor="username" className={style.form_label}>
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={style.form_input}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                  </div>
                  <div className={style.form_group}>
                    <label htmlFor="desc" className={style.form_label}>
                      Description
                    </label>
                    <input
                      type="text"
                      name="desc"
                      id="desc"
                      className={style.desc_input}
                      onChange={formik.handleChange}
                      value={formik.values.desc}
                    />
                  </div>
                  <div>
                    <button className={style.admin_btn}>Save Topic</button>
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

export default Topics;
