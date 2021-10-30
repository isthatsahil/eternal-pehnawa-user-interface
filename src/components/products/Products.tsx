import React from "react";
import Product from "@components/products/Product";
import { Grid } from "@mui/material";
import ProductSkeleton from "./ProductSkeleton";

const Products = ({
  products,
  isLoading,
}: {
  products: any;
  isLoading: boolean;
}) => {
  const ProductsDisplay = () => {
    return (
      <Grid container spacing={4} justifyContent="center">
        {products?.data?.map((product: any, index: number) => (
          <Grid item sm={6} md={4} key={index}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    );
  };
  return <div>{isLoading ? <ProductSkeleton /> : <ProductsDisplay />}</div>;
};

export default Products;
