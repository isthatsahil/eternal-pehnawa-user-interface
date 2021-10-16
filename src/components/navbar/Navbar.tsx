import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import NavbarHamburger from "./NavbarHamburger";
import NavbarLogo from "./NavbarLogo";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import Tooltip from "@mui/material/Tooltip";

import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
                <Tooltip title="User Profile">
                  <IconButton onClick={handleClick} size="small" sx={{ mr: 2 }}>
                    <Avatar sx={{ width: 32, height: 32 }}>P</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>
                    <Avatar /> Profile
                  </MenuItem>
                  <MenuItem>
                    <Avatar /> My orders
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>

                {mobileView ? (
                  <Button
                    sx={{ color: "#191919" }}
                    size="small"
                    startIcon={<ShoppingCartIcon />}
                  ></Button>
                ) : (
                  <Button
                    sx={{ color: "#191919" }}
                    size="small"
                    startIcon={<ShoppingCartIcon />}
                  >
                    Cart
                  </Button>
                )}
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
