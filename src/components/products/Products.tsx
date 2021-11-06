import React from "react";
import { useSelector } from "react-redux";
import Product from "@components/products/Product";
import { Grid } from "@mui/material";
import ProductSkeleton from "./ProductSkeleton";
import { motion } from "framer-motion";

const parentVariant = {
  hidden: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const listVariants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ease: "easeOut",
      durantion: 1,
    },
  },
};

const gridVariants = {
  hidden: {
    opacity: 0,
    y: -16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      durantion: 1,
    },
  },
};
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
      <Grid
        component={motion.div}
        container
        spacing={4}
        justifyContent="center"
        variants={parentVariant}
        initial="hidden"
        animate="visible"
      >
        {view === "grid"
          ? products?.data?.map((product: any, index: number) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                key={index}
                component={motion.div}
                variants={gridVariants}
              >
                <Product view={view} product={product} />
              </Grid>
            ))
          : products?.data?.map((product: any, index: number) => (
              <Grid
                item
                xs={12}
                key={index}
                component={motion.div}
                variants={listVariants}
              >
                <Product view={view} product={product} />
              </Grid>
            ))}
      </Grid>
    );
  };
  return <div>{isLoading ? <ProductSkeleton /> : <ProductsDisplay />}</div>;
};

export default Products;
