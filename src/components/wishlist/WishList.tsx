import React, { SyntheticEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
// import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography } from "@mui/material";

import Product from "./Product";

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
    },
    header: {
      margin: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    emptyWishlist: {
      height: "70vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

const WishList = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const wishlist = useSelector((state: any) => state.wishlist.items);

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

  return (
    <>
      <Button
        size="medium"
        onClick={toggleDrawer(true)}
        sx={{ color: "#191919" }}
        startIcon={<FavoriteIcon />}
      >
        {/* WhishList */}
      </Button>
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
              size="medium"
              startIcon={<FavoriteIcon />}
            >
              Wishlist
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.closeCartBtn}
              onClick={toggleDrawer(false)}
            >
              Close Wishlist
            </Button>
          </motion.div>
          <motion.hr
            variants={cartOpenVariant}
            initial="initial"
            animate="animate"
          />
          <div>
            {wishlist.length === 0 ? (
              <div className={classes.emptyWishlist}>
                <Typography>YOUR WISHLIST IS EMPTY</Typography>
              </div>
            ) : (
              wishlist.map((productId: string) => (
                <Product key={productId} productId={productId} />
              ))
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default WishList;
