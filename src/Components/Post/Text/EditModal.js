import React, { useState, useEffect } from "react";
import { Grid, Box, useTheme, useMediaQuery } from "@mui/material";
import "react-quill/dist/quill.snow.css";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { Fetch } from "../../../Trials/Controller";
import Utils from "../../Utils/Utils";
import { useNavigate } from "react-router-dom";
import Loader from "../../Utils/Loader";
import ReactQuill from "react-quill";

const CustomToolbar = () => (
  <Box id="toolbar" width="100%" borderRadius="10px" marginBottom="4px">
    <select
      className="ql-header"
      defaultValue={""}
      onChange={(e) => e.persist()}
    >
      <option value="1"></option>
      <option value="2"></option>
      <option selected></option>
    </select>
    <span className="ql-formats">
      <button
        className="ql-list"
        value="ordered"
        ngbPopover="Ordered list"
      ></button>
      <button
        className="ql-list"
        value="bullet"
        ngbPopover="Bulleted list"
      ></button>
    </span>
    <button className="ql-bold"></button>
    <button className="ql-underline"></button>
    <button className="ql-italic"></button>
  </Box>
);

const mStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "95%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflowY: "scroll",
  height: "100vh",
  p: 1,
};

export default function EditModal({ open, setOpen, item }) {
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useNavigate();
  const [holder, setHolder] = useState(item.body);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [options, setOptions] = useState([]);
  const [image, setImage] = useState("");
  const [height, setHeight] = useState("");
  const [details, setDetails] = useState({});

  const close = () => {
    setShowAlert(false);
  };

  const onCloseClick = () => {
    router.replace("/posts");
  };
  const { qValue, setqValue } = useState("");
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("Spilleet_user");

    if (data) {
      setUserObj(JSON.parse(data));
    }
  }, []);
  useEffect(() => {
    setDetails(item);
  }, [item, open]);
  useEffect(() => {
    const val = window.innerHeight;
    setHeight(val);
    let mounted = true;
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    Fetch(`${process.env.REACT_APP_END_POINT}/display-category`, formData)
      .then((res) => {
        if (mounted) {
          if (res.data.success === false) {
            setStatus("error");
            setContent(res.data.message);
            setShowAlert(true);
          } else {
            setOptions(res.data);
          }
        }
      })
      .catch((err) => {
        setStatus("error");
        setContent(err.message);
        setShowAlert(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleQuillChange = (e) => {
    setHolder(e);
  };
  const formik = useFormik({
    initialValues: {
      title: item.title,
      topic: item.topic,
      body: "",
      image: item.image,
    },
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
      formData.append("usertoken", userObj.usertoken);
      formData.append("title", values.title);
      formData.append("content", holder);
      formData.append("cnt_id", item.cnt_id);
      // formData.append("body", values.body);
      formData.append("ctg_id", values.topic);
      formData.append("image", image ? image : item.image_url);

      Fetch(`${process.env.REACT_APP_END_POINT}/edit-post`, formData)
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
            router.replace(`/`);
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

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const style = {
    display: "flex",
    flexDirection: "column",
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        overflow="scroll"
      >
        <Box sx={mStyle}>
          <Typography variant="h5" component="h2" textAlign="center">
            Edit Post
          </Typography>

          <Grid
            minHeight={matches ? `${height}px` : "100vh"}
            pb={1}
            mb={2}
            container
            justifyContent="center"
            alignItems="center"
          >
            {item ? (
              <Grid
                item
                md={8}
                px={matches ? 1 : 4}
                minHeight={"100%"}
                width={matchesSM ? "100%" : "90%"}
                boxShadow="0px 4px 25px rgba(0, 0, 0, 0.25)"
                borderRadius="8px"
                display="flex"
                justifyContent="center"
                flexDirection="column"
                margin="auto"
              >
                {showAlert && (
                  <Utils
                    status={status}
                    content={content}
                    handleAlert={close}
                  />
                )}

                <form
                  onSubmit={formik.handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  {loading ? (
                    <Box
                      height="100%"
                      width="100%"
                      display="grid"
                      placeItems="center"
                    >
                      <Loader />
                    </Box>
                  ) : (
                    <>
                      <Box minHeight="90%" style={style}>
                        <Box
                          display="flex"
                          flexDirection="column"
                          px={matches ? 1 : 4}
                          mt={1}
                          mb={2}
                        >
                          <label
                            htmlFor="title"
                            style={{
                              fontWeight: "700",
                              fontSize: "18px",
                              marginBottom: "4px",
                            }}
                          >
                            Title
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            style={{
                              padding: "12px 8px",
                              border: "1px solid lightgrey",
                              outline: "none",
                              borderRadius: "10px",
                            }}
                            onChange={formik.handleChange}
                            value={formik.values.title}
                          />
                        </Box>
                        <Box height="250px" px={matches ? 1 : 4}>
                          <label
                            htmlFor="title"
                            style={{
                              fontWeight: "700",
                              fontSize: "18px",
                              marginBottom: "4px",
                            }}
                          >
                            Content
                          </label>
                          <CustomToolbar />
                          <ReactQuill
                            style={{
                              height: matches ? "70%" : "70%",
                              borderRadius: "10px",
                              fontFamily: "Inter !important",
                            }}
                            value={holder}
                            onChange={(e) => handleQuillChange(e)}
                            modules={modules}
                            formats={formats}
                            placeholder="What do you know?"
                          />
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="column"
                          my={2}
                          px={matches ? 1 : 4}
                        >
                          <label
                            htmlFor="image"
                            style={{
                              fontWeight: "700",
                              fontSize: "18px",
                              marginBottom: "4px",
                            }}
                          >
                            Add Image
                            <small>
                              <em>(jpeg/jpg)</em>
                            </small>
                          </label>
                          <input
                            type="file"
                            name="image"
                            id="image"
                            style={{ padding: "8px 4px", width: "100%" }}
                            onChange={handleChange}
                          />
                        </Box>
                        {/* <Box
                      display="flex"
                      flexDirection="column"
                      px={matches ? 1 : 4}
                    >
                      <label
                        htmlFor="topic"
                        style={{
                          fontWeight: "700",
                          fontSize: "18px",
                          marginBottom: "4px",
                        }}
                      >
                        Category
                      </label>
                      <select
                        name="topic"
                        id="topic"
                        value={formik.values.topic}
                        onChange={formik.handleChange}
                        style={{
                          padding: "12px 8px",
                          border: "1px solid lightgrey",
                          outline: "none",
                          borderRadius: "10px",
                        }}
                      >
                        <option value="" >
                          Choose a Category
                        </option>
                        {options.length > 0 &&
                          options.map((item) => (
                            <option key={item.ctg_id} value={item.ctg_id}>
                              {item.ctg_name}
                            </option>
                          ))}
                      </select>
                    </Box> */}
                        <Box
                          display="flex"
                          flex="5%"
                          flexDirection="column"
                          mt={2}
                          mb={1}
                          px={matches ? 1 : 4}
                        >
                          <button
                            type="submit"
                            style={{
                              border: "none",
                              outline: "none",
                              background: "#171194",
                              padding: "8px 12px",
                              color: "white",
                              fontSize: "18px",
                              fontWeight: "600",
                              borderRadius: "8px",
                            }}
                          >
                            UPDATE
                          </button>
                        </Box>
                        <Box
                          display="flex"
                          flex="5%"
                          flexDirection="column"
                          mb={2}
                          px={matches ? 1 : 4}
                        >
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleClose();
                            }}
                            style={{
                              border: "none",
                              outline: "none",
                              background: "red",
                              padding: "8px 12px",
                              color: "white",
                              fontSize: "18px",
                              fontWeight: "600",
                              borderRadius: "8px",
                            }}
                          >
                            Close
                          </button>
                        </Box>
                      </Box>
                    </>
                  )}
                </form>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
