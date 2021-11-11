import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { makeStyles } from "@mui/styles";
import { Tooltip } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import Badge from "@mui/material/Badge";
import { IconButton } from "@mui/material";
import {
  useGetCartQuery,
  useRetrieveCartQuery,
} from "../../redux/services/cart";
const productList = [
  {
    id: 1,
    name: "asd adsad",
    price: 1234,
    quantity: 1,
  },
  {
    id: 2,
    name: "sd",
    price: 173,
    quantity: 5,
  },
  {
    id: 3,
    name: "asddsad",
    price: 23,
    quantity: 1,
  },
  {
    id: 4,
    name: "asd a ds",
    price: 12,
    quantity: 2,
  },
];

const cartOpenVariant = {
  initial: {
    y: 30,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 0.8,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};
const useStyles = makeStyles(
  (theme: { breakpoints: { down: (arg0: string) => any } }) => ({
    container: {
      width: "30rem",
      [theme.breakpoints.down("sm")]: {
        width: "100vw",
      },
      "& tr": {
        height: "4rem",
      },

      "& tr td": {
        height: "auto !important",
      },
      "& input[type=number]::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: "0",
      },
      "& input[type=number]::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
        margin: "0",
      },
      "& input:focus": {
        outline: "none",
      },
    },
    header: {
      margin: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    closeCartBtn: {
      fontSize: "12px !important",
      borderRadius: "1rem !important",
      textTransform: "capitalize !important",
      color: "#6C7C90 !important",
      border: "1px solid #6C7C90 !important",
    },
    checkoutBtntnContainer: {
      margin: "2rem",
      display: "flex",
      justifyContent: "center",
      "& button": {
        backgroundColor: "#8BC79A",
        width: "15rem",
        height: "4rem",
        "&:hover": {
          backgroundColor: "#5ba76f",
        },
      },
      "& svg": {
        marginRight: "3px",
      },
    },
    cartItemContainer: {
      "& .MuiTableCell-root": {
        marginTop: "4rem",
        marginBottom: "4rem",
      },
      "& span": {
        fontSize: "14px",
        color: "#6C7C90",
        width: "68%",
        display: "inline-block",
        textAlign: "left",
        verticalAlign: "top",
        fontWeight: "400",
      },
      "& td:nth-child(1)": {
        paddingLeft: "30px",
      },
      "& td:nth-child(2)": {
        paddingRight: "0",
        "& > *": {
          float: "right",
        },
      },
      "& td:nth-child(3)": {
        paddingRight: "0",
        paddingLeft: "0",
      },
      "& td:nth-child(3) span": {
        float: "right",
        textAlign: "right",
        color: "#8BC79A",
      },
    },
    quantityInput: {
      width: "2rem",
      height: "1.1rem",
      textAlign: "center",
    },
    removeItemBtn: {
      color: "#ff5977",
      cursor: "pointer",
      "& svg": {
        width: "1.1rem",
      },
    },
    orderTotal: {
      border: "1px solid #c7c7c7",
      borderRadius: "5px",
      width: "75%",
      margin: " 2rem auto",
      padding: "1.5rem",
      "&>p": {
        display: "flex",
        justifyContent: "space-between",
        margin: "0.5rem 0rem",
      },
      "&> hr": {
        margin: "1rem 0",
      },
      "&>p:last-child": {
        fontWeight: "600",
      },
    },
  })
);

const Cart = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  const CartItem = ({ item }: { item: any }) => {
    return (
      <React.Fragment>
        <TableRow key={item.id} className={classes.cartItemContainer}>
          <TableCell>
            <span>{item.name}</span>
          </TableCell>
          <TableCell>
            <input
              type="number"
              defaultValue={item.quantity}
              className={classes.quantityInput}
            />
          </TableCell>
          <TableCell>
            <span>₹ {item.price}</span>
          </TableCell>
          <TableCell className={classes.removeItemBtn}>
            <Tooltip title="remove" placement="bottom">
              <DeleteIcon fontSize="small" />
            </Tooltip>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  const { data } = useGetCartQuery("");
  const cartItems = useRetrieveCartQuery({ cartId: data?.id });
  console.log("cartItems", cartItems?.data);
  return (
    <>
      <Badge badgeContent={4} color="warning">
        <IconButton
          size="small"
          onClick={toggleDrawer(true)}
          sx={{ color: "#191919" }}
        >
          <ShoppingCartIcon />
        </IconButton>
      </Badge>
      <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
        <div className={classes.container}>
          <motion.div
            className={classes.header}
            variants={cartOpenVariant}
            initial="initial"
            animate="animate"
          >
            <Button
              sx={{ color: "#191919" }}
              size="small"
              startIcon={<ShoppingCartIcon />}
            >
              Cart
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.closeCartBtn}
              onClick={toggleDrawer(false)}
            >
              Close Cart
            </Button>
          </motion.div>
          <motion.hr
            variants={cartOpenVariant}
            initial="initial"
            animate="animate"
          />
          <Table>
            {productList.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </Table>
          <div className={classes.orderTotal}>
            <Typography>
              <span>Subtotal :</span>
              <span>₹ 1234</span>
            </Typography>
            <Typography>
              <span>Tax :</span>
              <span>₹ 0</span>
            </Typography>
            <Typography>
              <span>Shiping fee :</span>
              <span>₹ 10</span>
            </Typography>
            <Divider />
            <Typography>
              <span>Order Total :</span>
              <span>₹ 1244</span>
            </Typography>
          </div>
          <div className={classes.checkoutBtntnContainer}>
            <Button variant="contained">
              <LockIcon />
              Secure Checkout
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
