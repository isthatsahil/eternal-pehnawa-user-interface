import React from "react";
import Product from "@components/products/Product";
import { Grid } from "@mui/material";

const Products = ({ products }: { products: any }) => {
  return (
    <div>
      <Grid container spacing={4} justifyContent="center">
        {products?.data?.map((product: any, index: number) => (
          <Grid item key={index} sm={6} md={4}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
