import React, { useContext, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Style from "../../styles/Carousell.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Context, Fetch } from "../../Trials/Controller";
import Loader from "../Utils/Loader";
import TrendingShorts from "../Post/Text/TrendingShorts";


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
export function fixCarouselLength(arr){
  if(arr.length >= 4) {
    return 4
  } 
  return arr.length
}
const Carousell = () => {

  const { category } = useContext(Context);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items:fixCarouselLength(data),
    slidesToSlide: fixCarouselLength(data), // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1280, min: 650 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 650, min: 350 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  small: {
    breakpoint: { max: 350, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
  

  useEffect(() => {
    setLoading(true);
    const formData = new FormData();
    formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
    Fetch(`${process.env.REACT_APP_END_POINT}/get-all-content`, formData)
      .then((res) => {
        console.log(res)
        setLoading(false);
        if (res.data.success === false) {
          return;
        } else if(Array.isArray(res.data)) {
          setData(res.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        window.alert(err.message);
      });
  }, []);
  return (
    <div className={Style.wrapper}>
      {loading ? (
        <Loader />
      ) : (
        <div className={Style.container}>
          {data.length > 0 &&
          <Carousel
            swipeable={true}
            draggable={true}
            // showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
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
              {data.map((item) => <TrendingShorts key={item.id} item={item} />)}
          </Carousel>
              }
        </div>
      )}
    </div>
  );
};

export default Carousell;
