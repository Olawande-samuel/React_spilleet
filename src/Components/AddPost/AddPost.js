import { Box } from "@mui/material";
import {Link} from'react-router-dom'
import { FaPlus } from "react-icons/fa";
import style from "../../styles/Addpost.module.css"
const AddPost = () => {
  if (typeof window !== "undefined") {
    const access = localStorage.getItem("user");

    if (access) {
      const useable = JSON.parse(access);
      return (
        <Box
            className={style.btnContainer}
            border="1px solid lightgrey"
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding="10px"
            // backgroundColor="#171194"
            borderRadius="4px"
          >
        <Link to="/user/create-post">
            <button className={style.addPostBtn} >
              <i> <FaPlus /></i>
              <p>
                Create new post
              </p>
            </button>
        </Link>
          </Box>
      );
    }
  }
  return null;
};

export default AddPost;
