import React from "react";
import Product from "@components/products/Product";
import { Grid } from "@mui/material";
import ProductSkeleton from "./ProductSkeleton";

const Products = ({
  products,
  isLoading,
  view = "grid",
}: {
  products: any;
  isLoading: boolean;
  view: String;
}) => {
  const ProductsDisplay = () => {
    return (
      <Grid container spacing={4} justifyContent="center">
        {view === "grid"
          ? products?.data?.map((product: any, index: number) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                <Product view={view} product={product} />
              </Grid>
            ))
          : products?.data?.map((product: any, index: number) => (
              <Grid item xs={12} key={index}>
                <Product view={view} product={product} />
              </Grid>
            ))}
      </Grid>
    );
  };
  return <div>{isLoading ? <ProductSkeleton /> : <ProductsDisplay />}</div>;
};

export default Products;
