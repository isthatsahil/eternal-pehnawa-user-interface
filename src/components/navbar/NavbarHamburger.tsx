import { ReactNode, useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import NavbarMenu from "./NavbarMenu";
import { gsap } from "gsap";

const useStyles = makeStyles({
  hamburger: {
    display: "none",
    zIndex: "9",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    position: "fixed",
    height: "100%",
    width: "100%",
  },
  secondaryBackground: {
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    position: "fixed",
    height: "100%",
    width: "100%",
    backgroundColor: "#191919",
    zIndex: "-1",
  },
  menuLayers: {
    position: "relative",
    backgroundColor: "#e20001",
    height: "100%",
    overflow: "hidden",
  },
  cityBackground: {
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: "0",
    backgroundSize: "cover !important",
    backgroundRepeat: "no-repeat !important",
    animation: "$slideRight 30s infinite",
  },
  "@keyframes slideRight": {
    "0%": {
      backgroundPosition: "0% 0%",
    },
    "25% ": {
      backgroundPosition: "40% 10%",
    },
    "50%": {
      backgroundPosition: "0% 10%",
    },
    "75%": {
      backgroundPosition: "10% 40%",
    },
    "100%": {
      backgroundPosition: "0% 0%",
    },
  },
});

const NavbarHamburger = ({ menuState }: { menuState: any }) => {
  const classes = useStyles();
  const menu = useRef(null);
  const revealMenu = useRef(null);
  const revealMenuBackground = useRef(null);
  const cityBackground = useRef(null);

  useEffect(() => {
    if (menuState.clicked === false) {
      gsap.to([revealMenu.current, revealMenuBackground.current], {
        duration: 0.8,
        height: 0,
        ease: "power3.inOut",
        stagger: {
          amount: 0.07,
        },
      });
      gsap.to(menu.current, {
        duration: 1,
        css: { display: "none" },
      });
    } else if (
      menuState.clicked === true ||
      (menuState.clicked === true && menuState.initial === null)
    ) {
      gsap.to(menu.current, {
        duration: 0,
        css: { display: "block" },
      });
      gsap.to([revealMenuBackground.current, revealMenu.current], {
        duration: 0,
        opacity: 1,
        height: "100%",
      });
      staggerReveal(revealMenuBackground.current, revealMenu.current);
    }
  }, [menuState]);

  const staggerReveal = (
    node1: { node1: ReactNode },
    node2: { node2: ReactNode }
  ) => {
    gsap.from([node1, node2], {
      duration: 0.8,
      height: 0,
      transformOrigin: "right top",
      skewY: 2,
      ease: "power3.inOut",
      stagger: {
        amount: 0.1,
      },
    });
  };
  const handleCity = (city: { city: any }) => {
    gsap.to(cityBackground.current, {
      duration: 0,
      background: `url(${city}) center center`,
    });

    gsap.to(cityBackground.current, {
      duration: 0.4,
      opacity: 1,
      ease: "power3.inOut",
    });

    gsap.from(cityBackground.current, {
      duration: 0.4,
      skewY: 2,
      transformOrigin: "right top",
    });
  };

  const handleCityReturn = () => {
    gsap.to(cityBackground.current, {
      duration: 0,
      skewY: 0,
    });
    gsap.to(cityBackground.current, {
      duration: 0.4,
      opacity: 0,
      skewY: 0,
    });
  };
  return (
    <div ref={menu} className={classes.hamburger}>
      <div
        ref={revealMenuBackground}
        className={classes.secondaryBackground}
      ></div>
      <div ref={revealMenu} className={classes.menuLayers}>
        <div ref={cityBackground} className={classes.cityBackground}></div>
        <NavbarMenu
          menuState={menuState}
          handleCity={handleCity}
          handleCityReturn={handleCityReturn}
        />
      </div>
    </div>
  );
};

export default NavbarHamburger;
