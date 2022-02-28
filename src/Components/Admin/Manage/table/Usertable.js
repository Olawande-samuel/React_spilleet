// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Box, Modal, Typography, Button } from "@mui/material";

import style from "../../../../styles/Manage.module.css";
import { Fetch } from "../../../../Trials/Controller";
import Loader from "../../../Utils/Loader";
import Utils from "../../../Utils/Utils";

const Usertable = ({ data, index, getAllUsers }) => {
  const [open, setOpen] = useState(false);
  const handleClick = (e, id) => {
    setOpen(true);
    e.preventDefault();
  };
  return (
    <tr>
      <td>{index}</td>
      <td>{data.fullname}</td>
      <td>{data.email}</td>
      <td>
        <div className={style.action}>
          <button
            className={style.post_remove}
            onClick={(e) => {
              handleClick(e, data.cnt_id);
            }}
          >
            Remove
          </button>
        </div>
      </td>
      <BasicModal
        data={data}
        handleOpen={handleClick}
        open={open}
        setOpen={setOpen}
        getAllUsers={getAllUsers}
      />
    </tr>
  );
};

const mstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "300px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BasicModal({ data, handleOpen, open, setOpen, getAllContent }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (adminData) {
      const adminUser = JSON.parse(adminData);
      setAdmin(adminUser);
    }
  }, []);
  const handleClose = () => setOpen(false);
  const close = () => {
    setShowAlert(false);
  };

  const deleteUser = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    formData.append("admintoken", admin.admintoken);
    formData.append("usertoken", data.usertoken);

    Fetch(`${process.env.REACT_APP_END_POINT}/adminDeleteUser`, formData)
      .then((res) => {
        setLoading(false);
        setStatus("success");
        setContent(res.data.message);
        setShowAlert(true);
        getAllContent();
      })
      .catch((err) => {
        setLoading(false);
        setStatus("error");
        setContent(err.message);
        setShowAlert(true);
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {loading ? (
          <Box sx={mstyle}>
            <Loader />
          </Box>
        ) : (
          <>
            {showAlert && (
              <Utils status={status} content={content} handleAlert={close} />
            )}
            <Box sx={mstyle}>
              <Typography
                id="modal-modal-title"
                textAlign="center"
                variant="h6"
                component="h2"
              >
                Delete {data.fullname} ?
              </Typography>
              <hr />
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button type="submit" variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  onClick={deleteUser}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Usertable;
