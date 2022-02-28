import ImagePost from "../Post/Image/ImagePost";
import TextPost from "../Post/Text/TextPost";
import styles from "../../styles/Home.module.css";
import { useContext, useEffect, useState } from "react";
import { Context, Fetch } from "../../Trials/Controller";
import Layout from "../Layout/Layout";
import { SearchContext, UserContext, SidebarContext } from "../Auth/User";
import Loader from "../Utils/Loader";
import CategoryTabs from "../Category/Tabs";
import AddPost from "../AddPost/AddPost";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../Navbar/SideBar/Sidebar";
import ErrorBoundary from "../Error/ErrorBoundary"
const Index = () => {
  const { Posts } = useContext(Context);
  const context = useContext(UserContext);
  const [user, setUser] = context;
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [commentFig, setLoadCommentFig] = useState(false);
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usertoken, setUsertoken] = useState("");
  const [username, setUsername] = useState("");
  const [value, setValue] = useState("");
  const close = () => {
    setShowAlert(false);
  };
  const [search, setSearch] = useContext(SearchContext);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);
      setUsertoken(user.usertoken);
      setUsername(user.fullname);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    formData.append("usertoken", usertoken);
    Fetch(`${process.env.REACT_APP_END_POINT}/get-all-content`, formData)
      .then((res) => {
        setLoading(false);
        if (res.data.success === false) {
          setStatus("error");
          setContent(res.data.message);
          setShowAlert(true);
        } else if(Array.isArray(res.data)) {
          setStatus("success");
          setContent(res.data.message);
          setShowAlert(true);
          setData(res.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        setStatus("error");
        setContent(err.message);
        setShowAlert(true);
      });
  }, [reload, commentFig, usertoken]);

  const changeCategory = (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    formData.append("ctg_id", e);
    Fetch(`${process.env.REACT_APP_END_POINT}/display-content`, formData)
      .then((res) => {
        setLoading(false);

        if (res.data.success === false) {
          setStatus("error");
          setContent(res.data.message);
          setShowAlert(true);
          setData([]);
          window.alert(res.data.message);
        } else {
          setStatus("success");
          setContent(res.data.message);
          setShowAlert(true);
          setData(res.data);
        }
      })
      .catch((err) => {
        // window.alert(err.message)
        setLoading(false);
        setStatus("error");
        setContent(err.message);
        setShowAlert(true);
      });
  };
  return (
    <div>
      <Layout setValue={setValue}>
        <main className={styles.main}>
          <div className={styles.deviant}>
            <Box className={styles.mainContainer} padding="10px">
              <AddPost />
            </Box>
            <ErrorBoundary>
              <CategoryTabs handleClick={changeCategory} />
            </ErrorBoundary> 
          </div>

          <ErrorBoundary>
            
          <div className={styles.mainContainer}>
            <ImagePost />
            {loading ? (
              <Loader />
            ) : (
              <>
                {data.length > 0 &&
                  data
                    .filter(
                      (item) =>
                        item.body.toLowerCase().includes(search) ||
                        item.title.toLowerCase().includes(search) ||
                        item.username.toLowerCase().includes(search)
                    )
                    .map((item) =>
                      item.image_url === 0 ? (
                        <TextPost
                          key={item.ctn_id}
                          item={item}
                          reloader={setReload}
                          loadCommentFig={setLoadCommentFig}
                        />
                      ) : (
                        <ImagePost
                          key={item.ctn_id}
                          item={item}
                          reloader={setReload}
                          loadCommentFig={setLoadCommentFig}
                        />
                      )
                    )}
              </>
            )}
          </div>
          </ErrorBoundary>

        </main>
      </Layout>
      {/* <Outlet /> */}
    </div>
  );
};

export default Index;
