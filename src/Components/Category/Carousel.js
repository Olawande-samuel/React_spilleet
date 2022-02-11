import React, { useContext, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Style from "../../styles/Carousel.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Context, Fetch } from "../../Trials/Controller";
import Loader from "..//Utils/Loader";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1280, min: 650 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 650, min: 430 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  small: {
    breakpoint: { max: 430, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className={Style.carousel_button_group}>
      <div className={Style.background}>
        <ArrowBackIosNewIcon
          className={currentSlide === 0 ? "disable" : ""}
          onClick={() => previous()}
        />
      </div>
      <div className={Style.background}>
        <ArrowForwardIosIcon onClick={() => next()} />
      </div>
    </div>
  );
};

const CateCarou = ({ handleClick }) => {
  const { category } = useContext(Context);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const check = (index) => {
    switch (index) {
      case index > 10:
        return "/mental.png";
      case index < 10:
        return "/politics.png";
      default:
        break;
    }
  };

  useEffect(() => {
    setLoading(true);
    let mounted = true;
    const formData = new FormData();
    formData.append("apptoken", "7FHS8S43N2JF08");
    Fetch("https://spilleetapi.spilleet.com/display-category", formData)
      .then((res) => {
        setLoading(false);

        if (mounted) {
          if (res.data.success === false) {
            window.alert(res.data.message);
          } else {
            setCategoryList(res.data);
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        window.alert(err.message);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={Style.wrapper}>
      {loading ? (
            <Loader />
          ) : (
      <div className={Style.container}>
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          ssr={false} // means to render carousel on server-side.
          keyBoardControl={true}
          transitionDuration={500}
          // containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          arrows={false}
          customButtonGroup={<ButtonGroup />}
          renderButtonGroupOutside={true}
          // // deviceType={this.props.deviceType}
          // dotListClass="custom-dot-list-style"
          itemClass={Style.carouselItem}
        >
          {
            categoryList.length > 0 &&
            categoryList.map((item, index) => (
              <div
                onClick={() => handleClick(item.ctg_id)}
                key={item.ctg_id}
                style={{
                  width: "90%",
                  height: "148px",
                  background: `url(/category.jpg)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  borderRadius: "10px",
                  position: "relative",
                  border: "1px solid rgba(23, 17, 148, 0.94)",
                }}
              >
                <p className={Style.title}>{item.ctg_name}</p>
              </div>
            )
          )}
        </Carousel>
      </div>
  )}
    </div>
  );
};

export default CateCarou;
