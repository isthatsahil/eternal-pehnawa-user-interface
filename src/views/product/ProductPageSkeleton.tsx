import React from "react";
import { Skeleton, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  productPageSkeleton: {
    width: "100%",
    padding: "0 5vw",
    "& .MuiSkeleton-root": {
      "-webkit-transform": "unset",
      margin: "2rem",
    },
  },
}));

const ProductPageSkeleton = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={4} className={classes.productPageSkeleton}>
      <Grid item sm={12} md={6}>
        <Skeleton height="30rem" width="100%" />
      </Grid>
      <Grid item sm={12} md={6}>
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="50%" />
      </Grid>
    </Grid>
  );
};

export default ProductPageSkeleton;
