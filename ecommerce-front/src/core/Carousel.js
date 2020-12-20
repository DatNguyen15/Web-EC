import React from "react";
import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import "../dist/css/carousel.css";
const Carousel = () => {
  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="carou">
      <Slider {...settings}>
        <div className="size-carou">
          <img src="https://www.buyncellcanada.ca/wp-content/uploads/2018/11/Banner2.jpg"></img>
        </div>
        <div className="size-carou">
          <img src="https://xgear.vn/wp-content/uploads/2020/10/monitor_slider_compressed.jpg"></img>
        </div>
        <div className="size-carou">
          <img src="https://xgear.vn/wp-content/uploads/2020/08/Chi%E1%BA%BFn-game-c%E1%BB%B1c-%C4%91%C3%A3-c%C5%A9ng-m%C3%A0n-h%C3%ACnh-Asus.jpg"></img>
        </div>
        <div className="size-carou">
          <img src="https://xgear.vn/wp-content/uploads/2020/12/Mua-ROG-nh%E1%BA%ADn-L%C3%AC-X%C3%AC.jpg"></img>
        </div>
        <div className="size-carou">
          <img src="https://xgear.vn/wp-content/uploads/2020/11/amd-6000-seri.jpg"></img>
        </div>
        <div className="size-carou">
          <img src="https://macbookgiasi.vn/wp-content/uploads/2020/12/banner-macbook-air-2017-mqd32-chinh-hang-vn-macbookgiasi.jpg"></img>
        </div>
        <div className="size-carou">
          <img src="https://futureworldindia.in/wp-content/uploads/2020/12/MacBook-Pro_Web-Banner_Available-Now_2.jpg"></img>
        </div>
      </Slider>
    </div>
  );
};
export default Carousel;
