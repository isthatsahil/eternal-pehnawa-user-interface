import React, { SyntheticEvent, useState } from "react";
import {
  useRemoveItemFromCartMutation,
  useUpdateCartOnItemMutation,
  useGetCartQuery,
} from "../../redux/services/cart";
import { showSnackbar } from "../../redux/services/snackbarSlice";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableBody, Tooltip } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  (theme: { breakpoints: { down: (arg0: string) => any } }) => ({
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
  })
);

const CartItem = ({ item }: { item: any }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [removeFromCart, { data }] = useRemoveItemFromCartMutation({
    fixedCacheKey: "cart",
  });

  const [updateCart, cartUpdateResponse] = useUpdateCartOnItemMutation({
    fixedCacheKey: "cart",
  });

  const handleRemoveItemFromCart = () => {
    removeFromCart({
      cartId: data?.cart?.id,
      lineItemId: item.id,
    }).then(() => {
      dispatch(
        showSnackbar({
          message: "Item removed from cart",
          severity: "success",
        })
      );
    });
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(event.target.value);
    console.log(quantity);
    if (quantity > 0) {
      console.log("here");
      updateCart({
        cartId: data?.cart?.id,
        lineItemId: item.id,
        quantity: event.target.value,
      }).then(() => {
        dispatch(
          showSnackbar({
            message: "Updated item quantity",
            severity: "success",
          })
        );
      });
    }
  };

  return (
    <React.Fragment>
      <TableBody>
        <TableRow key={item?.id} className={classes.cartItemContainer}>
          <TableCell>
            <span>{item?.name}</span>
          </TableCell>
          <TableCell>
            <input
              type="number"
              defaultValue={item?.quantity}
              className={classes.quantityInput}
              onChange={handleQuantityChange}
            />
          </TableCell>
          <TableCell>
            <span>₹ {item?.price?.formatted_with_symbol}</span>
          </TableCell>
          <TableCell className={classes.removeItemBtn}>
            <Tooltip title="remove" placement="bottom">
              <DeleteIcon fontSize="small" onClick={handleRemoveItemFromCart} />
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableBody>
    </React.Fragment>
  );
};

export default CartItem;
