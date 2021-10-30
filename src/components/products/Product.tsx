import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";

const useStyles = makeStyles((theme: any) => ({
  product: {
    // width: "20rem !important",
    // flexGrow: "1",
  },
  imageContainer: {
    width: "100%",
    height: "12rem",
    borderRadius: "5px",
    overflow: "hidden",
    backgroundColor: "#ffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid grey",
    "& img": {
      maxWidth:"100%",
      maxHeight:"100%",
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
    "& button": {
      backgroundColor: "#AA7B5F",
      color: "white",
      border: "none",
      borderRadius: "2.5rem",
      height: "2.5rem",
      margin: "0.3rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
    "& button:nth-child(1)": {
      width: "4rem",
      fontSize: "0.9rem",
      letterSpacing: "1px",
    },
    "& button:nth-child(2)": {
      width: "2.5rem",
      fontSize: "1rem",
    },
  },
  nameAndPrice: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem 0rem",
    "& span:nth-child(2)": {
      color: "#AA7B5F",
    },
  },
}));

const Product = ({ product }: { product: any }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.imageContainer}>
        <img src={product.image.url} alt={product.name} />
        <div className={classes.overlay} id="overlay">
          <button>View</button>
          <button>
            <AddShoppingCartRoundedIcon />
          </button>
        </div>
      </div>
      <div className={classes.nameAndPrice}>
        <Typography component="span">{product.name}</Typography>
        <Typography component="span">₹ {product.price.formatted}</Typography>
      </div>
    </div>
  );
};

export default Product;
