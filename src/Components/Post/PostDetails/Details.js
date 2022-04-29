import Comment from "../Text/Comment";
import NoImage from "./NoImage";
import WithImage from "./WithImage";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Fetch } from "../../../Trials/Controller";
import Utils from "../../Utils/Utils";
import Loader from "../../Utils/Loader";
import { Box } from "@mui/material";
import Style from "../../../styles/PostDetails.module.css";
const Details = () => {
  const { id } = useParams();

  // const { id } = router.query
  const [data, setData] = useState({});
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const close = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    setLoading(true);
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    formData.append("cnt_id", id);
    Fetch(`${process.env.REACT_APP_END_POINT}/read-content-data`, formData)
      .then((res) => {
        setLoading(false);
        if (res.data.success === false) {
          setStatus("error");
          setContent(res.data.message);
          setShowAlert(true);
        } else {
          setData({ ...res.data[0] });
          setShowAlert(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setStatus("error");
        setContent(err.message);
        setShowAlert(true);
      });
  }, [id]);
  return (
    <div>
      {/* <Head>
        <title>Spilleet</title>
        <meta name="description" content="Spilleet social media app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      {/* <Layout> */}
        <main className={Style.content_Container}>
          <div>
            {showAlert && (
              <Utils status={status} content={content} handleAlert={close} />
            )}
          </div>
          {loading ? (
            <Box
              height="100vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Loader />
            </Box>
          ) : (
            <>
              {data.img_url === 0 ? (
                <NoImage data={data} />
              ) : (
                <WithImage post={data} />
              )}
            </>
          )}
        </main>
      {/* </Layout> */}
    </div>
  );
};

export default Details;
