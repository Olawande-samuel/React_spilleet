import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import style from "../../../styles/TextPost.module.css";
const PostContent = ({ children, content, link }) => {
  return (
    <Link to={`/posts/${link}`}>
      <Box marginTop="14.76px" style={{ cursor: "pointer" }}>
        <div>{children}</div>
        <Box>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "300",
              lineHeight: "131.19%",
            }}
            className={style.previewParagraph}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Box>
      </Box>
    </Link>
  );
};

export default PostContent;
