import Footer from "@components/footer/Footer";
import Category from "@components/categories/Category";
import FeaturedProducts from "@components/featuredProducts/FeaturedProducts";
import Testimonial from "@components/testimonial/Testimonial";
import "./home.css";
import React, { useEffect, useRef, useState } from "react";
import { bannerData } from "../../dummyData/bannerData.js";
import Typography from "@mui/material/Typography";

// TODO :: comonent modulization needs to be done
export const HomeComponent = () => {
  console.log("dummy", bannerData);
  const length = bannerData.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeout = useRef(null);

  useEffect(() => {
    const nextSlide = () => {
      setCurrentSlide((currentSlide) =>
        currentSlide === length - 1 ? 0 : currentSlide + 1
      );
    };
    timeout.current = setTimeout(nextSlide, 5000);
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [currentSlide, length]);

  // TODO :: To be used if we introduce next and prev buttons
  // const prevSlide = () => {
  //   if (timeout.current) {
  //     clearTimeout(timeout.current);
  //   }
  //   setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1);
  // };

  // TODO : Make it as a seperate component named BANNER

  return (
    <>
      {bannerData.map((baner: { desc: string; img: string }, index: number) => (
        <>
          {index === currentSlide && (
            <div className="container" key={index}>
              <Typography color="initial" variant="h2" className="left">
                {baner.desc}
              </Typography>

              <div className="right">
                <img src={baner.img} className="image" alt="" />
              </div>
            </div>
          )}
        </>
      ))}
      <Category />
      <FeaturedProducts />
      <Testimonial />
      <Footer />
    </>
  );
};
