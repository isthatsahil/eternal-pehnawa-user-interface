import React, { SyntheticEvent, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import { makeStyles } from "@mui/styles";
import LockIcon from "@mui/icons-material/Lock";
import { motion } from "framer-motion";
import Badge from "@mui/material/Badge";
import { IconButton } from "@mui/material";
import CartItem from "@components/Cart/CartItem";
import { useAddToCartMutation } from "../../redux/services/cart";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const cartOpenVariant = {
  initial: {
    y: 30,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 0.8,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};
const useStyles = makeStyles(
  (theme: { breakpoints: { down: (arg0: string) => any } }) => ({
    container: {
      width: "30rem",
      [theme.breakpoints.down("sm")]: {
        width: "100vw",
      },
      "& tr": {
        height: "4rem",
      },

      "& tr td": {
        height: "auto !important",
      },
      "& input[type=number]::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: "0",
      },
      "& input[type=number]::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
        margin: "0",
      },
      "& input:focus": {
        outline: "none",
      },
    },
    header: {
      margin: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    closeCartBtn: {
      fontSize: "12px !important",
      borderRadius: "1rem !important",
      textTransform: "capitalize !important",
      color: "#6C7C90 !important",
      border: "1px solid #6C7C90 !important",
    },
    checkoutBtntnContainer: {
      margin: "2rem",
      display: "flex",
      justifyContent: "center",
      "& button": {
        backgroundColor: "#8BC79A",
        width: "15rem",
        height: "4rem",
        "&:hover": {
          backgroundColor: "#5ba76f",
        },
      },
      "& svg": {
        marginRight: "3px",
      },
    },
    orderTotal: {
      border: "1px solid #c7c7c7",
      borderRadius: "5px",
      width: "75%",
      margin: " 2rem auto",
      padding: "1.5rem",
      "&>p": {
        display: "flex",
        justifyContent: "space-between",
        margin: "0.5rem 0rem",
      },
      "&> hr": {
        margin: "1rem 0",
      },
      "&>p:last-child": {
        fontWeight: "600",
      },
    },
    link: {
      color: "#ffff",
      textDecoration: "none",
    },

    checkoutBtn: {
      backgroundColor: "#8BC79A",
      width: "15rem",
      height: "4rem",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      color: "#ffff",
      minWidth: "64px",
      padding: "6px 16px",
      borderRadius: "4px",
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
      zIndex: 100000,
      transition:
        "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      "&:hover": {
        backgroundColor: "#5ba76f",
        boxShadow:
          "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
      },
    },
  })
);

const Cart = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [trigger, { data }] = useAddToCartMutation({
    fixedCacheKey: "cart",
  });
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  const handleCartCheckout = (url: string) => {
    // if (isAuthenticated) {
    //   console.log("cart if");
    //   const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    //   if (newWindow) newWindow.opener = null;
    // } else {
    //   console.log("cart else");
    //   loginWithRedirect({ screen_hint: "signin" });
    // }
  };
  return (
    <>
      <Badge
        badgeContent={data?.cart?.line_items?.length || 0}
        color="warning"
        showZero
      >
        <IconButton
          size="small"
          onClick={toggleDrawer(true)}
          sx={{ color: "#191919" }}
        >
          <ShoppingCartIcon />
        </IconButton>
      </Badge>
      <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
        <div className={classes.container}>
          <motion.div
            className={classes.header}
            variants={cartOpenVariant}
            initial="initial"
            animate="animate"
          >
            <Button
              sx={{ color: "#191919" }}
              size="small"
              startIcon={<ShoppingCartIcon />}
            >
              Cart
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.closeCartBtn}
              onClick={toggleDrawer(false)}
            >
              Close Cart
            </Button>
          </motion.div>
          <motion.hr
            variants={cartOpenVariant}
            initial="initial"
            animate="animate"
          />
          {data?.cart?.line_items.length > 0 ? (
            <>
              <Table>
                {data?.cart?.line_items.map((item: any, index: React.Key) => (
                  <CartItem key={index} item={item} />
                ))}
              </Table>
              <div className={classes.orderTotal}>
                <Typography>
                  <span>Subtotal :</span>
                  <span>
                    {data?.cart?.subtotal?.formatted_with_symbol || 0}
                  </span>
                </Typography>

                <Divider />
                <Typography>
                  <span>Order Total :</span>
                  <span>
                    {data?.cart?.subtotal?.formatted_with_symbol || 0.0}
                  </span>
                </Typography>
              </div>
              <div className={classes.checkoutBtntnContainer}>
                <NavLink
                  variant="contained"
                  to="/checkout"
                  className={classes.checkoutBtn}
                  onClick={toggleDrawer(false)}
                >
                  <LockIcon />
                  Secure Checkout
                </NavLink>
              </div>
            </>
          ) : (
            <div>
              <p style={{ padding: "8px" }}>Your Cart is empty</p>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
