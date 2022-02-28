// @ts-nocheck
import { Box, Modal, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import style from "../../../../styles/Manage.module.css";
import { Fetch } from "../../../../Trials/Controller";
import Loader from "../../../Utils/Loader";

const Tabledata = ({ data, index, getAllContent }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (e, id) => {
    e.preventDefault();
    setOpen(true);
  };
  return (
    <tr>
      <td>{index}</td>
      <td>{data.title}</td>
      <td>{data.username}</td>
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
        getAllContent={getAllContent}
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
  const handleClose = () => setOpen(false);

  const deletePosts = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    formData.append("cnt_id", data.cnt_id);
    Fetch(`${process.env.REACT_APP_END_POINT}/adminDeletePost`, formData)
      .then((res) => {
        setLoading(false);
        setStatus("error");
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
          <Box sx={mstyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete {data.title} ? by {data.username}
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
                onClick={deletePosts}
              >
                Delete
              </Button>
            </Box>
          </Box>
        )}
      </Modal>
    </div>
  );
}

export default Tabledata;
