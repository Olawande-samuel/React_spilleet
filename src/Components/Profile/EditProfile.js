import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ProfileImg from "./ProfileImg";
import { Fetch } from "../../Trials/Controller";
import Utils from "../Utils/Utils";
import Loader from "../Utils/Loader";
import ProfileImage from "./ProfileImage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "grid",
  placeItems: "center",
};

export default function EditProfile({
  handleOpen,
  handleClose,
  open,
  reloadProfile,
}) {
  const [image, setImage] = useState("");
  const [usertoken, setUsertoken] = useState("");

  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const close = () => {
    setShowAlert(false);
  };

  const [preview, setPreview] = useState("");
  useEffect(() => {
    const data = localStorage.getItem("Spilleet_user");
    if (data) {
      const user = JSON.parse(data);
      setUsertoken(user.usertoken);
    } else {
      setUsertoken("");
    }
  }, []);
  const chooseImage = (e) => {
    setImage(e.target.files[0]);
  };
  const uploadImage = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    formData.append("img", image);
    formData.append("usertoken", usertoken);
    Fetch(`${process.env.REACT_APP_END_POINT}/profile-upload`, formData)
      .then((res) => {
        setLoading(false);
        if (res.data.success === false) {
          setStatus("error");
          setContent(res.data.message);
          setShowAlert(true);
        } else {
          reloadProfile();
          setStatus("success");
          setContent(res.data.message);
          setShowAlert(true);
          window.location.reload();
        }
      })
      .catch((err) => {
        setLoading(false);
        setStatus("error");
        setContent(err.message);
        setShowAlert(true);
      });
  };
  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }
    const objUrl = URL.createObjectURL(image);
    setPreview(objUrl);
    return () => URL.revokeObjectURL(objUrl);
  }, [image]);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                lineHeight="30px"
                my={2}
              >
                {showAlert && (
                  <Utils
                    status={status}
                    content={content}
                    handleAlert={close}
                  />
                )}
                {preview && (
                  <Box width="250px" maxHeight="250px">
                    <img
                      src={preview}
                      alt="preview"
                      style={{ maxWidth: "100%" }}
                    />
                  </Box>
                )}
                <Box display="flex" flexDirection="column" alignItems="center">
                  <label htmlFor="profile">Select an image</label>
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    onChange={chooseImage}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
                mt={2}
              >
                <Button variant="outlined" color="error" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={uploadImage}>
                  Upload
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
