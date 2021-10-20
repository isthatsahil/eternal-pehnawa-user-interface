import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { Tooltip } from "@mui/material";

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

const useStyles = makeStyles((theme: any) => ({
  container: {
    width: "26rem",
    padding: "1rem",
    [theme.breakpoints.down('sm')]: {
      width: "100vw",
    }
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnContainer: {
    margin: "2rem",
    display: "flex",
    justifyContent: "center",
  },
  quantityBtnGroup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Cart = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const mobileView = useMediaQuery("(max-width:900px)");

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
        <TableRow key={item.id}>
          <TableCell>
            <Typography>{item.name}</Typography>
          </TableCell>
          {/* <TableCell>{item.quantity}</TableCell> */}
          <TableCell>
            <div className={classes.quantityBtnGroup}>
              <IconButton size="small">
                <RemoveCircleRoundedIcon />
              </IconButton>
              <Typography>{item.quantity}</Typography>
              <IconButton size="small">
                <AddCircleRoundedIcon />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            {" "}
            <Typography>₹ {item.price}</Typography>{" "}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {mobileView ? (
        <Button
          sx={{ color: "#191919" }}
          size="small"
          startIcon={<ShoppingCartIcon />}
          onClick={toggleDrawer(true)}
        ></Button>
      ) : (
        <Button
          sx={{ color: "#191919" }}
          size="small"
          startIcon={<ShoppingCartIcon />}
          onClick={toggleDrawer(true)}
        >
          Cart
        </Button>
      )}
      <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
        <div className={classes.container}>
          <div className={classes.header}>
            <Button
              sx={{ color: "#191919" }}
              size="small"
              startIcon={<ShoppingCartIcon />}
            >
              Cart
            </Button>
            <Tooltip title="close" placement="left" >
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
            </Tooltip>
          </div>
          <Table>
            {productList.map((item: Object) => (
              <CartItem item={item} />
            ))}
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell></TableCell>
              <TableCell> ₹ 3241</TableCell>
            </TableRow>
          </Table>
          <div className={classes.btnContainer}>
            <Button variant="contained">Checkout</Button>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default Cart;
