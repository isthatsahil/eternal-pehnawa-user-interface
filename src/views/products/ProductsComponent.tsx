import React from "react";
import Header from "@components/products/Header";
import { Grid } from "@mui/material";
import Filter from "@components/products/Filter";
import Products from "@components/products/Products";
import { makeStyles } from "@mui/styles";
import { Route } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    padding: "1rem 5vw",
    backgroundColor: "#ffff",
  },
}));

const ProductsComponent = ({
  allProducts,
  sarees,
  suits,
  homeDecors,
}: {
  allProducts: any;
  sarees: any;
  suits: any;
  homeDecors: any;
}) => {
  const classes = useStyles();
  return (
    <section className={classes.container}>
      <Header />
      <Grid container>
        <Grid item md={3}>
          <Filter />
        </Grid>
        <Grid item md={9}>
          <Route path={"/products"} exact>
            <Products products={allProducts} />
          </Route>
          <Route path={"/products/saree"}>
            <Products products={sarees} />
          </Route>
          <Route path={"/products/suit"}>
            <Products products={suits} />
          </Route>
          <Route path={"/products/home-decor"}>
            <Products products={homeDecors} />
          </Route>
        </Grid>
      </Grid>
    </section>
  );
};

export default ProductsComponent;
