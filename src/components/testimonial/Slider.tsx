import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

const Slider = ({ reviews }: { reviews: any }) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 12000,
          disableOnInteraction: false,
        }}
        navigation={true}
        className="mySwiper"
      >
        {reviews.map(
          (
            review: {
              text:
                | boolean
                | React.ReactChild
                | React.ReactFragment
                | React.ReactPortal;
              author:
                | boolean
                | React.ReactChild
                | React.ReactFragment
                | React.ReactPortal;
            },
            index: React.Key
          ) => (
            <SwiperSlide key={index}>
              <div>
                <blockquote>
                  <p>{review.text}</p>
                </blockquote>
                <h6>{review.author}</h6>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </>
  );
};

export default Slider;
