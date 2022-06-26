import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import NavbarHamburger from "./NavbarHamburger";
import NavbarLogo from "./NavbarLogo";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import NavbarLogin from "./NavbarLogin";
import Cart from "../Cart/Cart";
import WishList from "@components/wishlist/WishList";
import { login } from "../../lib/commerce";
const useStyles = makeStyles(() => ({
  navHead: {
    backgroundColor: "rgb(246, 241, 236)",
    position: "sticky",
    top: 0,
    zIndex: 6,
    boxShadow: "-7px 4px 12px 7px #05010130",
    transition: "0.35s cubic-bezier(0.68, -0.22, 1, 1)"
  },
  container: {
    height: "auto",
    marginBottom: "1vh",
    width: "90vw",
    margin: "0 auto",
  },
  wrapper: {
    padding: "1rem",
  },
  innerHeader: {
    position: "relative",
    zIndex: "10",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuBtn: {
    "&>span": {
      border: "none",
      background: "none",
      outline: "none",
      cursor: "pointer",
      fontSize: ".8rem",
      color: "#191919",
      textTransform: "none",
      fontWeight: "bold",
    },
  },
}));
const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const [scroll, setScrolled] = useState(false);

  const [menuState, setMenuState] = useState({
    initial: false,
    clicked: null,
    menuName: "Menu",
  });

  const [disabled, setDisabled] = useState(false);

  /** 
   * TODO for responsiveness
   const [view, setView] = useState({ mobileView: false, drawerOpen: false });
   const { mobileView } = view; 
  */
  const handleMenu = () => {
    disableMenu();
    if (menuState.initial === false) {
      setMenuState({
        initial: null,
        clicked: true,
        menuName: "Close",
      });
    } else if (menuState.clicked === true) {
      setMenuState({
        initial: null,
        clicked: !menuState.clicked,
        menuName: "Menu",
      });
    } else if (menuState.clicked === false) {
      setMenuState({
        initial: null,
        clicked: !menuState.clicked,
        menuName: "Close",
      });
    }
  };
  /**
  * TODO for responsiveness
     useEffect(() => {
    const setReponsiveness = () => {
      return window.innerWidth < 900
        ? setView((prevState) => ({ ...prevState, mobileView: true }))
        : setView((prevState) => ({ ...prevState, mobileView: false }));
    };
    setReponsiveness();
    window.addEventListener("resize", () => setReponsiveness());
    return () => {
      window.removeEventListener("resize", () => setReponsiveness());
    };
  }, []);
  */

  useEffect(() => {
    setMenuState({
      initial: null,
      clicked: false,
      menuName: "Menu",
    });
  }, [location]);
  //Determine if our menu button should be disabled or not

  // hook to listen scroll event to show the navbar
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const disableMenu = () => {
    setDisabled(!disabled);
    setTimeout(() => {
      setDisabled(false);
    }, 1200);
  };

  const handleScroll = () => {
    const offset = window.pageYOffset;
    offset > 210 ? setScrolled(true) : setScrolled(false);
  };

  return (
    <header className={scroll && classes.navHead}>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.innerHeader}>
            <NavbarLogo />
            <div className={classes.menuBtn}>
              <Button
                size="small"
                disabled={disabled}
                onClick={() => handleMenu()}
                sx={{ color: "#191919" }}
              >
                Categories
              </Button>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <NavbarLogin />
                <Cart />
                <WishList />
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavbarHamburger menuState={menuState} />
    </header>
  );
};

export default Navbar;
