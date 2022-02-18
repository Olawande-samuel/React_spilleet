import { useContext, useEffect, useState } from "react";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Item from "../Interest/Items";
import InterestContext, { Fetch } from "../../Trials/Controller";
import Style from "../../styles/Interest.module.css";
import Utils from "../Utils/Utils";
import { UserContext } from "../Auth/User";
const Interest = () => {
  const [itemList, setItemList] = useState([]);
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const close = () => {
    setShowAlert(false);
  };

  const context = useContext(UserContext);
  const [usertoken, setUsertoken] = useState("");

  const router = useNavigate();

  const [check, setCheck] = useState(false);
  const [checkId, setCheckId] = useState("");
  const [interests, setInterests] = useState([]);
  const set = new Set();
  const handleCheck = (e, name) => {
    if (e.target.checked === true) {
      set.add(e.target.name);
      setInterests([...interests, ...set]);
    } else {
      set.delete(e.target.name);
      // setInterests([...interests, ...set])
      const newArray = interests.filter((ele) => ele !== name);
      setInterests(newArray);
    }
  };

  const handleUnCheck = (e, item) => {
    // setCheck(!check)
    // if(e.target.checked === true){
    //       setInterests([...interests, e.target.name])
    // }
    //   if(check === false){
    //     setCheck(true)
    //   } else {
    //     setCheck(false)
    //     // const newArray  = interests.filter(ele => ele =! item );
    //     // setInterests(newArray)
    //   }
  };
  const interestSet = new Set();

  //   const handleUnCheck =(e, item)=> {
  //     interests.filter((item)=>interests.includes(e))
  //       if(check === false){
  //           if(set.has(e.target.name)){
  //               set.delete(e.target.name)
  //           }
  //       }
  //   }

  useEffect(() => {
    let mounted = true;
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);
      setUsertoken(user.usertoken);
    }
    const formData = new FormData();
    formData.append("apptoken", "7FHS8S43N2JF08");
    Fetch("https://spilleetapi.spilleet.com/display-category", formData)
      .then((res) => {
        if (mounted) {
          if (res.data.success === false) {
            setStatus("error");
            setContent(res.data.message);
            setShowAlert(true);
          } else {
            setItemList(res.data);
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

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("apptoken", "7FHS8S43N2JF08");
      formData.append("usertoken", usertoken);
      formData.append("interests", interests.toString());

      Fetch("https://spilleetapi.spilleet.com/update-user-interests", formData)
        .then((res) => {
          if (res.data.success === false) {
            setStatus("error");
            setContent(res.data.message);
            setShowAlert(true);
          } else {
            setStatus("success");
            setContent(res.data.message);
            setShowAlert(true);
            router("/");
          }
        })
        .catch((err) => {
          setStatus("error");
          setContent(err.message);
          setShowAlert(true);
        });
    },
  });

  return (
    <>
      <Grid
        container
        // xs={12}
        px={2}
        className={Style.wrapper}
        height="100vh"
        justifyContent="center"
        alignItem="center"
      >
        <Grid
          container
          // xs={12}
          // md={10}
          alignItem="center"
          gap={1}
          sx={{ height: "100%" }}
        >
          <Grid item md={8}>
            <h1 style={{ fontSize: "48px" }}>
              Select your favourite topics categories
            </h1>
            {showAlert && (
              <Utils status={status} content={content} handleAlert={close} />
            )}
          </Grid>

          <Grid item xs={12}>
            <form
              onSubmit={formik.handleSubmit}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Box className={Style.gridItems}>
                {itemList.length > 0 &&
                  itemList.map((item) => (
                    <Box key={item.id}>
                      <Item
                        item={item}
                        interests={interests}
                        handleUnCheck={handleUnCheck}
                        set={interestSet}
                        handleCheck={handleCheck}
                        check={check}
                        setCheck={setCheck}
                      />
                    </Box>
                  ))}
              </Box>

              <Grid
                item
                sm={12}
                alignSelf="center"
                justifySelf="flex-end"
                display=" flex"
                flexDirection="column"
                justifyContent="flex-end"
              >
                <Box className={Style.footer} mb={3}>
                  <Button
                    type="submit"
                    sx={{
                      background: "#04C35C",
                      fontWeight: "700",
                      borderRadius: "23px",
                      padding: "12px 41px",
                    }}
                    variant="contained"
                    size="large"
                  >
                    Continue
                  </Button>
                </Box>
                <Box className={Style.footer}>
                  <p>
                    <Link to="/learn-more" style={{ color: "#2D3748" }}>
                      Learn more about these contents
                    </Link>
                  </p>
                </Box>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Interest;
