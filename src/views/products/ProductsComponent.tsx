import React from "react";
import Header from "@components/products/Header";
import { Grid } from "@mui/material";
import Filter from "@components/products/Filter";
import Products from "@components/products/Products";
import { makeStyles } from "@mui/styles";
//import { Route } from "react-router-dom";
import FilterTop from "@components/products/FilterTop";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

const useStyles = makeStyles(() => ({
  container: {
    padding: "1rem 5vw",
    backgroundColor: "#ffff",
  },
}));

const ProductsComponent = ({
  data,
  error,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError;
}) => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <section className={classes.container}>
        <Grid container>
          <Grid item xs={12} sm={3} md={3}>
            <Filter />
          </Grid>
          <Grid item xs={12} sm={9} md={9}>
            <FilterTop />
            {error ? (
              <div>
                <p>Something went wrong</p>
              </div>
            ) : (
              <Products products={data} isLoading={isLoading} />
            )}

            {/* <Route path={"/products"} exact>
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
            </Route> */}
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default ProductsComponent;
