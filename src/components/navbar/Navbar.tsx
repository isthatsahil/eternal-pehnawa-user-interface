import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import NavbarHamburger from "./NavbarHamburger";
import NavbarLogo from "./NavbarLogo";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NavbarLogin from "./NavbarLogin";

import Tooltip from "@mui/material/Tooltip";

import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Cart from "../Cart/Cart";
const useStyles = makeStyles(() => ({
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

  const [menuState, setMenuState] = useState({
    initial: false,
    clicked: null,
    menuName: "Menu",
  });

  const [disabled, setDisabled] = useState(false);
  const [view, setView] = useState({ mobileView: false, drawerOpen: false });
  const { mobileView } = view;
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

  useEffect(() => {
    console.log(location);
    setMenuState({
      initial: null,
      clicked: false,
      menuName: "Menu",
    });
  }, [location]);
  //Determine if our menu button should be disabled or not

  const disableMenu = () => {
    setDisabled(!disabled);
    setTimeout(() => {
      setDisabled(false);
    }, 1200);
  };

  return (
    <header>
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
              <div style={{ display: "flex" }}>
                <NavbarLogin />
                <Cart />
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
