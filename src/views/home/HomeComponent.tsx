import Footer from "@components/footer/Footer";
import Category from "@components/categories/Category";
import FeaturedProducts from "@components/featuredProducts/FeaturedProducts";
import Testimonial from "@components/testimonial/Testimonial";
import "./home.css";
import React, { useEffect, useRef, useState } from "react";
import { bannerData } from "../../dummyData/bannerData.js";
import Typography from "@mui/material/Typography";
import OurMission from "@components/ourMission/OurMission";
import { makeStyles } from "@mui/styles";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { IconButton } from "@mui/material";

const useStyles = makeStyles(() => ({
  banner: {
    position: "relative",
  },
  scrollBtnContainer: {
    postion: "absolute",
    top: "100%",
    left: "50%",
  },
  nextBtn: {
    transform: "rotate(180deg)",
  },
  btnsContainer: {
    display: "flex",
    justifyContent: "center",
    "& button": {
      boxShadow: "1px 1px 5px #000000",
      borderRadius: "100%",
      margin: "0.5rem",
      backgroundColor: "#fff"
    }
  }
}));

// TODO :: comonent modulization needs to be done
export const HomeComponent = () => {
  const length = bannerData.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeout = useRef(null);
  const classes = useStyles();

  const nextSlide = () => {
    setCurrentSlide((currentSlide) =>
      currentSlide === length - 1 ? 0 : currentSlide + 1
    );
  };

  useEffect(() => {
    // timeout.current = setTimeout(nextSlide, 5000);              uncomment latter
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [currentSlide, length]);

  // TODO :: To be used if we introduce next and prev buttons
  const prevSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1);
  };

  // TODO : Make it as a seperate component named BANNER

  return (
    <>
      <section className={classes.banner}>
        {bannerData.map(
          (baner: { desc: string; img: string }, index: number) => (
            <>
              {index === currentSlide && (
                <div className="container" key={index}>
                  <div className="left">
                    <Typography color="initial" variant="h2">
                      {baner.desc}
                    </Typography>
                    <div className={classes.btnsContainer} >
                      <IconButton onClick={prevSlide}>
                        <ArrowBackIosRoundedIcon />
                      </IconButton>
                      <IconButton onClick={nextSlide} >
                        <ArrowBackIosRoundedIcon className={classes.nextBtn} />
                      </IconButton>
                    </div>
                  </div>

                  <div className="right">
                    <img src={baner.img} className="image" alt="" />
                  </div>
                </div>
              )}
            </>
          )
        )}
        <div className={classes.scrollBtnContainer}>
          <section>
            <a href="#category" className="scroll-down"></a>
          </section>
        </div>
      </section>
      <Category />
      <OurMission />
      <FeaturedProducts />
      <Testimonial />
      <Footer />
    </>
  );
};
