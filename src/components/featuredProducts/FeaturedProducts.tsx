import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
// import Product from "./Product";
import Product from "@components/products/Product";
import { Link } from "react-router-dom";
import { useGetProductCategoryQuery } from "../../redux/services/products";
import ProductSkeleton from "@components/products/ProductSkeleton";
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

const FeaturedProducts = () => {
  const classes = useStyles();

  const {
    data: saree,
    error: sareeErr,
    isLoading: sareeLoading,
  } = useGetProductCategoryQuery("saree");
  const {
    data: suit,
    error: suitErr,
    isLoading: suitLoading,
  } = useGetProductCategoryQuery("suit");
  const {
    data: homeDecor,
    error: homeDecorErr,
    isLoading: homeDecorLoading,
  } = useGetProductCategoryQuery("home-decor");

  return (
    <section className={classes.container}>
      <div className={classes.wrapper}>
        <p className={classes.title}>Featured Products</p>
        <Grid container spacing={4} justifyContent="center">
          {!(sareeLoading && suitLoading && homeDecorLoading) ? (
            <>
              {saree?.data.slice(0, 1).map((saree: any) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={saree.name}>
                  <Product product={saree} view="grid" />
                </Grid>
              ))}
              {suit?.data.slice(0, 1).map((suit: any) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={suit.name}>
                  <Product product={suit} view="grid" />
                </Grid>
              ))}
              {homeDecor?.data.slice(0, 1).map((homeDecor: any) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={homeDecor.name}>
                  <Product product={homeDecor} view="grid" />
                </Grid>
              ))}
            </>
          ) : <ProductSkeleton /> }
        </Grid>
        <Link to="/all-products" style={{ textDecoration: "none" }}>
          <Button variant="contained" className={classes.allProductsBtn}>
            All products
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
