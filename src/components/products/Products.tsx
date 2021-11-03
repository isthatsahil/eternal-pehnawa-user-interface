import React from "react";
import { useSelector } from "react-redux";
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
  const { view } = useSelector((state: any) => state.filter);
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
