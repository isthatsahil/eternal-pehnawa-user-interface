import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
const useStyles = makeStyles(() => ({
  container: {
    background: "rgb(246, 241, 236) !important",
  },
  wrapper: {
    width: "90vw",
    margin: "auto",
    marginBottom: "1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
    // fontSize: "2.5rem",
    lineHeight: "3rem",
    marginBottom: "3.3rem",
  },
  allProductsBtn: {
    width: "10rem",
    margin: "3rem !important",
    backgroundColor: "#AA7B5F !important",
    "&:hover": {
      backgroundColor: "#c7a18a !important",
    },
  },
}));

const products = [
  {
    img: "https://dl.airtable.com/.attachmentThumbnails/65708b701baa3a84883ad48301624b44/2de058af",
    name: "Entertainment Center",
    price: 123,
  },
  {
    img: "https://dl.airtable.com/.attachmentThumbnails/1e4a818f5184993e430420a152315b40/873c7094",
    name: "Modern Bookshelf",
    price: 123,
  },
  {
    img: "https://dl.airtable.com/.attachmentThumbnails/1af97a4d3eb28563962d8e3520727ffc/1b9cc17f",
    name: "High-Back Bench",
    price: 123,
  },
];

const FeaturedProducts = () => {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <div className={classes.wrapper}>
        <p className={classes.title}>Featured Products</p>
        <Grid container spacing={4} justifyContent="center">
          {products.map((product, index) => (
            <Grid item key={index}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
        <Link to="/products" style={{ textDecoration: "none" }}>
          <Button variant="contained" className={classes.allProductsBtn}>
            All products
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
