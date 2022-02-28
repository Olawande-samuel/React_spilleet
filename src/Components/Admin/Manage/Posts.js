// @ts-nocheck
import {
  Stack,
  Box,
  Grid,
  useTheme,
  useMediaQuery,
  Modal,
  Typography,
} from "@mui/material";
import Utils from "../../Utils/Utils";
import React, { useState, useEffect } from "react";
import style from "../../../styles/Manage.module.css";
import Tabledata from "./table/Tabledata";
import { useFormik } from "formik";
import { Fetch } from "../../../Trials/Controller";
import { useNavigate } from "react-router-dom";
import Loader from "../../Utils/Loader";
import "react-quill/dist/quill.snow.css";
import Searchbar from "./Searchbar";

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
      <option defaultValue></option>
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

const Posts = () => {
  const [display, setDisplay] = useState(false);
  const router = useNavigate();
  const [holder, setHolder] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [options, setOptions] = useState([]);
  const [image, setImage] = useState("");
  const [height, setHeight] = useState("");

  const [search, setSearch] = useState("");

  const close = () => {
    setShowAlert(false);
  };
  const [posts, setPosts] = useState([]);
  const [userObj, setUserObj] = useState(null);

  const getAllContent = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    Fetch(`${process.env.REACT_APP_END_POINT}/get-all-content`, formData)
      .then((res) => {
        setLoading(false);
        if (res.data.success === false) {
          setStatus("error");
          setContent(res.data.message);
          setShowAlert(true);
        }
        setPosts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setStatus("error");
        setContent(err.message);
        setShowAlert(true);
      });
  };

  useEffect(() => {
    const data = localStorage.getItem("admin");

    if (data) {
      setUserObj(JSON.parse(data));
    }

    getAllContent();
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
  const handleSwitch = (e) => {
    e.preventDefault();
    setDisplay(!display);
  };
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

  const handleQuillChange = (e) => {
    setHolder(e);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
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
      formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
      formData.append("usertoken", userObj.admintoken);
      formData.append("title", values.title);
      formData.append("body", holder);
      formData.append("ctg_id", values.topic);
      formData.append("image", values.image);

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
      {showAlert && (
        <Utils status={status} content={content} handleAlert={close} />
      )}
      <Box display="flex" mt="2px" gap="5px">
        <button
          className={display === false ? style.admin_btn : style.admin_false}
          onClick={handleSwitch}
        >
          Add posts
        </button>
        <button
          className={display === true ? style.admin_btn : style.admin_true}
          onClick={handleSwitch}
        >
          Manage posts
        </button>
      </Box>
      {display === false ? (
        <Box>
          <Grid
            container
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            {loading ? (
              <Box height="90%" width="100%" display="grid" placeItems="center">
                <Loader />
              </Box>
            ) : (
              <Grid
                item
                mt={2}
                sm={12}
                height="auto"
                px={matches ? 1 : 4}
                width={matchesSM ? "100%" : "90%"}
              >
                <form onSubmit={formik.handleSubmit} height="auto">
                  <Box>
                    <h2 className={style.admin_title}>Add posts</h2>
                    <Box display="flex" flexDirection="column" mt={1} mb={2}>
                      <label
                        htmlFor="title"
                        style={{ fontWeight: "700", fontSize: "18px" }}
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        style={{
                          padding: "12px 8px",
                          border: "1px solid grey",
                          outline: "none",
                          borderRadius: "10px",
                        }}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                      />
                    </Box>
                    <Box>
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
                          borderRadius: "10px",
                          fontFamily: "Inter !important",
                          height: "150px",
                        }}
                        value={holder}
                        onChange={(e) => handleQuillChange(e)}
                        modules={modules}
                        // formats={formats}
                        placeholder="What do you know?"
                      />
                    </Box>

                    <Box display="flex" flexDirection="column">
                      <label
                        htmlFor="image"
                        style={{ fontWeight: "700", fontSize: "18px" }}
                      >
                        Add Image
                      </label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        style={{ padding: "8px 4px", width: "100%" }}
                        value={formik.values.image}
                      />
                    </Box>
                    <Box display="flex" flexDirection="column">
                      <label
                        htmlFor="topic"
                        style={{ fontWeight: "700", fontSize: "18px" }}
                      >
                        Topic
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
                        <option defaultValue>Choose a Category</option>
                        {options.length > 0 &&
                          options.map((item) => (
                            <option key={item.ctg_id} value={item.ctg_id}>
                              {item.ctg_name}
                            </option>
                          ))}
                      </select>
                    </Box>
                    <Box my={2}>
                      <button className={style.submit}>Submit</button>
                    </Box>
                  </Box>
                </form>
              </Grid>
            )}
          </Grid>
        </Box>
      ) : (
        <Box mt={2} minHeight="90vh">
          <h2 className={style.admin_title}>Manage posts</h2>
          <Searchbar search={search} handleSearch={handleSearch} />
          <Box mt={2} width="100%" style={{ overflowX: "scroll" }}>
            {loading ? (
              <Loader />
            ) : (
              <table className={style.table}>
                <thead>
                  <tr className={style.thead_row}>
                    <th>S/N</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length > 0 &&
                    posts.map((post, index) => (
                      <Tabledata
                        data={post}
                        index={index}
                        getAllContent={getAllContent}
                      />
                    ))}
                </tbody>
              </table>
            )}
          </Box>
        </Box>
      )}
    </Stack>
  );
};

export default Posts;
