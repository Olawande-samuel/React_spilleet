import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Grid, Box, useTheme, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";
import { Fetch } from "../../Trials/Controller";
import Utils from "../Utils/Utils";
import { useNavigate } from "react-router-dom";
import Loader from "../Utils/Loader";

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

const Editor = () => {
  const router = useNavigate();
  const [holder, setHolder] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [options, setOptions] = useState([]);
  const [image, setImage] = useState("");
  const [height, setHeight] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }
    const objUrl = URL.createObjectURL(image);
    setPreview(objUrl);
    return () => URL.revokeObjectURL(objUrl);
  }, [image]);
  
  const close = () => {
    setShowAlert(false);
  };

  const onCloseClick = () => {
    router.replace("/posts");
  };
  const { qValue, setqValue } = useState("");
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data) {
      setUserObj(JSON.parse(data));
    }
  }, []);

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
      title: "",
      topic: "",
      body: "",
      image: null,
    },
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
      formData.append("usertoken", userObj.usertoken);
      formData.append("title", values.title);
      formData.append("body", holder);
      // formData.append("body", values.body);
      formData.append("ctg_id", values.topic);
      formData.append("image", image);

      Fetch(`${process.env.REACT_APP_END_POINT}/create-content`, formData)
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
            router(`/posts/${res.data.cnt_id}`);
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const style = {
    display: "flex",
    flexDirection: "column",
  };
  return (
    <>
      {/* <Head>
        <title>Spilleet</title>
        <meta name="description" content="Spilleet social media app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <Grid
        minHeight={matches ? `${height}px` : "100vh"}
        // minHeight="100vh"
        pb={1}
        marginTop="80px"
        mb={2}
        container
        justifyContent="center"
        alignItems="center"
      >
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
            <Utils status={status} content={content} handleAlert={close} />
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
                        color:"#C035A2"
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
                      htmlFor="content"
                      style={{
                        fontWeight: "700",
                        fontSize: "18px",
                        marginBottom: "4px",
                        color:"#C035A2"
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
                  {preview && 
                    <Box width="250px" height="250px">
                      <img src={preview} alt="preview" style={{maxWidth:"100%"}} />
                    </Box>
                    }
                    <label
                      htmlFor="image"
                      style={{
                        fontWeight: "700",
                        fontSize: "18px",
                        marginBottom: "4px",
                        color:"#C035A2"
                      }}
                    >
                      Add Image
                      <small>
                        <em>(jpeg/jpg/gif)</em>
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
                  <Box
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
                        color:"#C035A2"
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
                      <option value="">Choose a Category</option>
                      {options.length > 0 &&
                        options.map((item) => (
                          <option key={item.ctg_id} value={item.ctg_id}>
                            {item.ctg_name}
                          </option>
                        ))}
                    </select>
                  </Box>
                  <Box
                    display="flex"
                    flex="5%"
                    flexDirection="column"
                    my={2}
                    px={matches ? 1 : 4}
                  >
                    <button
                      type="submit"
                      style={{
                        border: "none",
                        outline: "none",
                        background: "#C035A2",
                        padding: "8px 12px",
                        color: "white",
                        fontSize: "18px",
                        fontWeight: "600",
                        borderRadius: "8px",
                      }}
                    >
                      PUBLISH
                    </button>
                  </Box>
                </Box>
              </>
            )}
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Editor;
