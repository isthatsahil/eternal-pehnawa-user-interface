import React, { useState } from "react";
import {
  Grid,
  Button,
  Typography,
  Divider,
  ButtonGroup,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import Header from "@components/products/Header";
<<<<<<< HEAD
import {
  useAddToCartMutation,
  useGetCartQuery,
} from "../../redux/services/cart";
=======
import ImageZoom from "@components/product/ImageZoom";
>>>>>>> falcon-dev

const useStyles = makeStyles((theme: any) => ({
  container: {
    marginTop: "0rem !important",
    padding: "4rem 5vw 6rem",
    backgroundColor: "#ffff",
    [theme.breakpoints.down("sm")]: {
      padding: "2rem 5vw",
    },
  },
  backBtn: {
    backgroundColor: "#AA7B5F !important",
  },
  content: {
    display: "flex",
    flexDirection: "column !important",
    justifyContent: "space-between",
  },
  productDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: "1",
  },
  addToCartBtn: {
    backgroundColor: "#AA7B5F !important",
  },
  colorOptions: {
    marginTop: "1rem",
    display: "flex",
    "&>button": {
      padding: "0",
      marginRight: "5px",
    },
    "&>p": {
      marginRight: "1rem",
      fontWeight: "600",
    },
  },
  sizeOptions: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "1rem",
    "&>button": {
      margin: "3px 5px 3px 0px",
    },
    "&>p": {
      marginRight: "1rem",
      fontWeight: "600",
    },
  },
  quantity: {
    marginTop: "1rem",
  },
  addToCartBtnContainer: {
    marginTop: "1rem",
  },
  assets: {
    display: "flex",
    flexWrap: "wrap",
    // height: "5rem",
    marginTop: "1rem",
    justifyContent: "center",
    "&>img": {
      maxHeight: "5rem",
      marginRight: "10px",
      borderRadius: "5px",
      margin: "2px",
    },
  },
  info: {
    display: "grid",
    gridTemplateColumns: "7rem 1fr",
    "&>span:nth-child(1)": {
      fontWeight: "600",
    },
  },
  selectedImg: {
    border: "2px solid #00b3ff",
    boxShadow: "1px 1px 5px #8adcff",
  },
  imagesSection: {
    width: "100%",
    display: "flex",
    flexDirection: "column !important",
    alignItems: "center",
  },
  policiesContainer: {
    marginTop: "1rem",
  },
}));

const ProductComponent = ({ data }: { data: any }) => {
  const classes = useStyles();
  const history = useHistory();
  const product = data?.data[0];

<<<<<<< HEAD
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [addToCart, result] = useAddToCartMutation({
    fixedCacheKey: "myCacheKey",
  });
  const Cart = useGetCartQuery("");
=======
  console.log(product)

  //modified path for breadcrumbs. Product Id replaced with name.
>>>>>>> falcon-dev
  const path = history.location.pathname
    .split("/")
    .slice(0, -1)
    .concat([product?.name])
    .join("/");

  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [mainImage, setMainImage] = useState(product?.assets[0].url);

  const getVariants = (option: string) => {
    return product?.variant_groups?.filter(
      (variant: any) => variant.name === option
    )[0]?.options;
  };

  const productColorOptions = getVariants("color");
  const productSizeOptions = getVariants("size");
  const stock = product?.inventory?.managed
    ? product?.inventory?.available
    : 100; // 100 -> unlimited
  const artisan = getVariants("artisan")?.[0]?.name;

  const increaseQuantity = () => {
    setQuantity((prevState: number) => prevState + 1);
  };
  const decreaseQuantity = () => {
    setQuantity((prevState: number) => prevState - 1);
  };
  const handleSizeChange = (size: string) => {
    setSize(size);
  };
  const handleColorChange = (color: string) => {
    setColor(color);
  };
  const handelImageChnage = (url: string) => {
    setMainImage(url);
  };

  const handleAddToCart = (
    productId: string,
    quantity: number,
    size: string,
    color: string
  ) => {
    addToCart({
      cartId: Cart?.data?.id,
      productId: productId,
      quantity: quantity,
      options: {
        size: size,
        color: color,
      },
    });
  };
  return (
    <>
      <Header path={path} />
      <Grid container className={classes.container} spacing={4}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => history.goBack()}
            className={classes.backBtn}
          >
            Back to Products
          </Button>
        </Grid>
        <Grid item sm={12} md={5} className={classes.imagesSection}>
          <ImageZoom src={mainImage} />
          <div className={classes.assets}>
            {product?.assets.map((image: any) => (
              <motion.img
                whileHover={{
                  scale: 1.2,
                }}
                onClick={() => handelImageChnage(image.url)}
                src={image.url}
                key={image.id}
                className={image.url === mainImage ? classes.selectedImg : null}
              />
            ))}
          </div>
        </Grid>
        <Grid item sm={12} md={7} className={classes.content}>
          <div className={classes.productDetails}>
            <div>
              <Typography variant="h5">{product.name}</Typography>
              <Typography variant="h6"> ₹ {product.price.formatted}</Typography>
              <span dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
            <div>
              <p className={classes.info}>
                <span>Available:</span>
                <span style={quantity >= stock ? { color: "red" } : {}}>
                  {quantity >= stock ? "out of" : "in"} stock
                </span>
              </p>
              <p className={classes.info}>
                <span>Artisan:</span>{" "}
                <span>{artisan ? artisan : "Artisan name not available"}</span>
              </p>
            </div>
          </div>
          <div>
            <Divider />
            <div className={classes.colorOptions}>
              <Typography>Color:</Typography>
              {!productColorOptions ? (
                <span>Color variants are not available</span>
              ) : (
                productColorOptions.map((_color: any) => (
                  <IconButton
                    key={_color.name}
                    onClick={() => handleColorChange(_color.name)}
                  >
                    {_color.name === color ? (
                      <CheckCircleIcon style={{ color: _color.name }} />
                    ) : (
                      <CircleIcon style={{ color: _color.name }} />
                    )}
                  </IconButton>
                ))
              )}
            </div>
            <div className={classes.sizeOptions}>
              <Typography>Size:</Typography>
              {!productSizeOptions ? (
                <span>Size variants are not available</span>
              ) : (
                productSizeOptions.map((_size: any) => (
                  <Button
                    variant={_size.name === size ? "contained" : "outlined"}
                    key={_size.name}
                    size="small"
                    onClick={() => handleSizeChange(_size.name)}
                  >
                    {_size.name}
                  </Button>
                ))
              )}
            </div>
            <div className={classes.quantity}>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                <Button onClick={decreaseQuantity} disabled={quantity <= 0}>
                  -
                </Button>
                <Button disabled sx={{ color: "#000000 !important" }}>
                  {quantity}
                </Button>
                <Button onClick={increaseQuantity} disabled={quantity >= stock}>
                  +
                </Button>
              </ButtonGroup>
            </div>
            <div className={classes.addToCartBtnContainer}>
              <Button
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
                className={classes.addToCartBtn}
                disabled={quantity === 0}
                onClick={() =>
                  handleAddToCart(product.id, quantity, size, color)
                }
              >
                Add to cart
              </Button>
            </div>
            <div className={classes.policiesContainer}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Shipping Policy</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex
                    asperiores amet facere magni deserunt cupiditate sapiente
                    tempora autem, labore sint perferendis excepturi facilis
                    perspiciatis impedit sit? Voluptatum corporis dolorem cumque
                    laboriosam quae doloremque at.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Shipping Policy</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex
                    asperiores amet facere magni deserunt cupiditate sapiente
                    tempora autem, labore sint perferendis excepturi facilis
                    perspiciatis impedit sit? Voluptatum corporis dolorem cumque
                    laboriosam quae doloremque at.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductComponent;
