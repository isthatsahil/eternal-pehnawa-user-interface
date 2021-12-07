import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Typography, IconButton } from "@mui/material";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import { motion } from "framer-motion";
import LinkButton from "@components/LinkButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../redux/services/wishlistSlice";

const useStyles = makeStyles((theme: any) => ({
  product: {
    // width: "20rem !important",
    // flexGrow: "1",
  },
  imageContainer: {
    width: "100%",
    height: "20rem",
    borderRadius: "5px",
    overflow: "hidden",
    backgroundColor: "#ffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      maxWidth: "100%",
      maxHeight: "100%",
      margin: "5px",
    },
    position: "relative",
    "&:hover #overlay": {
      opacity: "1",
    },
    [theme.breakpoints.down("sm")]: {
      width: "20rem",
      height: "12rem",
      margin: "auto",
    },
  },
  overlay: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "inherit",
    height: "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000096",
    opacity: "0",
    transition: ".5s ease",
    "& > *": {
      margin: "3px !important",
    },
  },
  addToCartBtn: {
    backgroundColor: "#AA7B5F !important", //button color
    borderRadius: "1rem",
    color: "white !important",
  },
  nameAndPrice: {
    display: "flex",
    flexDirection: "column",
    //justifyContent: "space-between",
    alignItems: "center",
    margin: "2rem 0rem",
    "& span:nth-child(2)": {
      color: "#AA7B5F",
    },
  },
  //forList view
  listProduct: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  listProductImageContaner: {
    width: "20rem",
    height: "20rem",
    flexShrink: "0",
    borderRadius: "5px",
    overflow: "hidden",
    backgroundColor: "#ffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      maxWidth: "100%",
      maxHeight: "100%",
      margin: "5px",
    },
    position: "relative",
    "&:hover #overlay": {
      opacity: "1",
    },
    [theme.breakpoints.down("sm")]: {
      width: "20rem",
      height: "12rem",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flexGrow: "1",
    justifyContent: "center",
    "&>div:nth-child(1)": {
      display: "flex",
      flexDirection: "column",
      "& span:nth-child(2)": {
        color: "#AA7B5F",
        margin: "0.5rem 0rem",
      },
      // flexGrow: "1",
    },
    marginLeft: "1rem",
    [theme.breakpoints.down("md")]: {
      marginLeft: "0",
      marginTop: "0.5rem",
    },
  },
  btnsContainer: {
    display: "flex",
    "& > *": {
      margin: "3px !important",
    },
  },
}));

const Product = ({
  product,
  view = "grid",
}: {
  product: any;
  view: string;
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToWishlist({productId: product.id}));
  };
  return (
    <>
      {view === "grid" ? (
        <div>
          <motion.div
            className={classes.imageContainer}
            whileHover={{
              scale: 1.1,
            }}
          >
            <img src={product.image.url} alt={product.name} />
            <div className={classes.overlay} id="overlay">
              <LinkButton to={`/all-products/product/${product.id}`}>
                View
              </LinkButton>
              <IconButton className={classes.addToCartBtn}>
                <AddShoppingCartRoundedIcon />
              </IconButton>
              <IconButton className={classes.addToCartBtn} onClick={handleAddToCart}>
                <FavoriteBorderIcon />
              </IconButton>
            </div>
          </motion.div>
          <div className={classes.nameAndPrice}>
            <Typography component="span">{product.name}</Typography>
            <Typography component="span">
              ₹ {product.price.formatted}
            </Typography>
          </div>
        </div>
      ) : (
        <div className={classes.listProduct}>
          <motion.div
            className={classes.listProductImageContaner}
            whileHover={{
              scale: 1.1,
            }}
          >
            <img src={product.image.url} alt={product.name} />
          </motion.div>
          <div className={classes.details}>
            <div>
              <Typography component="span">{product.name}</Typography>
              <Typography component="span">
                ₹ {product.price.formatted}
              </Typography>
              <span dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
            <div className={classes.btnsContainer}>
              <LinkButton to={`/all-products/product/${product.id}`}>
                View
              </LinkButton>
              <IconButton className={classes.addToCartBtn}>
                <AddShoppingCartRoundedIcon />
              </IconButton>
              <IconButton className={classes.addToCartBtn} onClick={handleAddToCart}>
                <FavoriteBorderIcon />
              </IconButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
