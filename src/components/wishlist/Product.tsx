// import React from "react";
// import {
//   Button,
//   IconButton,
//   Paper,
//   Typography,
//   Skeleton,
//   Tooltip,
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import { useGetProductQuery } from "../../redux/services/products";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import {useDispatch} from "react-redux"
// import {removeFromWsihlist} from "../../redux/services/wishlistSlice"

// const useSytles = makeStyles(() => ({
//   product: {
//     display: "flex",
//     margin: "5px",
//   },
//   imageContainer: {
//     width: "30%",
//     marginRight: "5px",
//     "& img": {
//       width: "100%",
//     },
//   },
//   details: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//   },
//   btnsContainer: {
//     "& > button": {
//       marginRight: "3px",
//     },
//   },
//   productName: {
//     textTransform: "capitalize",
//     fontWeight: "500",
//   },
//   skeleton: {
//     margin: "5px",
//   },
// }));

// const Product = ({ productId }: { productId: string }) => {
//   const classes = useSytles();
//   const dispatch = useDispatch();
//   const { data, isLoading } = useGetProductQuery(productId);
//   const product = data?.data[0];
//   const handleRemovefromWishlist = () => {
//     dispatch(removeFromWsihlist({productId}))
//   }
//   return (
//     <>
//       {isLoading ? (
//         <Skeleton
//           variant="rectangular"
//           className={classes.skeleton}
//           height={175}
//         />
//       ) : (
//         <div className={classes.product}>
//           <div className={classes.imageContainer}>
//             <img src={product?.image.url} />
//           </div>
//           <div className={classes.details}>
//             <div>
//               <Typography className={classes.productName}>
//                 {product?.name}
//               </Typography>
//               <Typography sx={{color: "#AA7B5F"}} >₹ {product?.price.formatted}</Typography>
//             </div>
//             <div className={classes.btnsContainer}>
//               <Tooltip title="Remove from wishlist">
//                 <IconButton
//                   size="small"
//                   sx={{
//                     backgroundColor: "#AA7B5F !important",
//                     color: "white !important",
//                   }}
//                   onClick={handleRemovefromWishlist}
//                 >
//                   <FavoriteBorderIcon />
//                 </IconButton>
//               </Tooltip>
//               <Button
//                 variant="contained"
//                 size="small"
//                 sx={{ backgroundColor: "#AA7B5F !important" }}
//                 startIcon={<AddShoppingCartIcon />}
//               >
//                 add to cart
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Product;

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useGetProductQuery } from "../../redux/services/products";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { removeFromWsihlist } from "../../redux/services/wishlistSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  card: {
    margin: "10px",
  },
  cardMedia: {
    "& img": {
      // maxHeight: "10rem"
    },
  },
}));

export default function Product({ productId }: { productId: string }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { data, isLoading } = useGetProductQuery(productId);
  const product = data?.data[0];

  const handleRemovefromWishlist = () => {
    dispatch(removeFromWsihlist({ productId }));
  };

  const goToProductDetailsPage = () => {
    history.push(`/all-products/product/${productId}`);
  };

  return (
    <Card sx={{ display: "flex" }} className={classes.card}>
      {isLoading ? (
        <Skeleton variant="rectangular" height={175} width={150} />
      ) : (
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={product?.image.url}
          alt="product"
          className={classes.cardMedia}
        />
      )}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          {isLoading ? (
            <>
              <Skeleton variant="text" width={175} />
              <Skeleton variant="text" width={120} />
            </>
          ) : (
            <>
              <Typography
                sx={{ textTransform: "capitalize" }}
                component="div"
                variant="h6"
              >
                {product?.name}
              </Typography>
              <Typography variant="subtitle1" color="#AA7B5F" component="div">
                ₹ {product?.price.formatted}
              </Typography>
            </>
          )}
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton onClick={handleRemovefromWishlist}>
            <FavoriteBorderIcon sx={{ height: 25, width: 25 }} />
          </IconButton>
          <IconButton onClick={goToProductDetailsPage}>
            <AddShoppingCartIcon sx={{ height: 25, width: 25 }} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
