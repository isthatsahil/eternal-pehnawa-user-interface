import { useEffect, useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setCheckoutTokenHelper } from "../../redux/services/checkoutHelper.js";
const OrderReview = ({
  isTaxSet,
  checkoutToken,
  updatedToken,
  handleDiscount,
  isDiscountValid,
}) => {
  const dispatch = useDispatch();
  const listOfItems = isTaxSet ? updatedToken : checkoutToken;
  const finalListOfItems = isDiscountValid ? updatedToken : listOfItems;
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountActive, setIsDiscountActive] = useState(true);

  useEffect(() => {
    if (finalListOfItems) {
      console.log("order review", finalListOfItems);
      dispatch(setCheckoutTokenHelper(finalListOfItems));
    }
  }, [finalListOfItems]);
  const handleDiscountData = () => {
    handleDiscount(finalListOfItems?.id, discountCode);
  };
  const clearDiscount = () => {
    handleDiscount(finalListOfItems?.id, "");
  };
  return (
    <div
      style={{
        padding: "0 1rem",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <div
        style={{
          width: "-webkit-fill-available",
          padding: " 0 4rem",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <List disablePadding>
          {finalListOfItems?.live?.line_items?.map((prod: { name: any }) => (
            <ListItem sx={{ padding: "10px 0" }} key={prod.name}>
              <ListItemAvatar sx={{ marginRight: "1rem" }}>
                <img
                  src={prod?.image?.url}
                  alt={prod?.name}
                  height="65px"
                  width="65px"
                />
              </ListItemAvatar>
              <ListItemText
                primary={prod?.name}
                secondary={`Quantity : ${prod?.quantity}`}
              />
              <Typography variant="body1">
                {prod?.line_total?.formatted_with_symbol}
              </Typography>
            </ListItem>
          ))}
          <hr />
          <div>
            <>
              <input
                name="discount"
                placeholder="Discount"
                style={{
                  padding: "0.9rem 0.7rem",
                  border: "1px  solid",
                  borderRadius: "5px",
                  width: "70%",
                  marginRight: "10px",
                }}
                onChange={(e) => {
                  setDiscountCode(e.target.value);
                }}
              />
              <Button
                variant="contained"
                disabled={discountCode === ""}
                sx={{
                  width: "20%",
                  backgroundColor: "black",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
                onClick={() => handleDiscountData()}
              >
                Apply
              </Button>
              {/**
               * !TODO :: Implement button to clear discount
               */}
              {/* <Button onClick={() => clearDiscount()}>Clear</Button> */}
            </>
          </div>
          <hr />
          <ListItem sx={{ padding: "0px" }}>
            <ListItemText primary="Subtotal" />
            <ListItemText sx={{ textAlign: "right" }}>
              {finalListOfItems?.live?.subtotal?.formatted_with_symbol}
            </ListItemText>
          </ListItem>
          {isDiscountValid ? (
            <ListItem sx={{ padding: "0px" }}>
              <ListItemText primary="Discount" />
              <ListItemText
                sx={{
                  textAlign: "right",
                  color: "red",
                  "&>span": {
                    fontWeight: "bold",
                  },
                }}
              >
                {`-${finalListOfItems?.live?.discount?.amount_saved?.formatted_with_symbol}`}
              </ListItemText>
            </ListItem>
          ) : (
            ""
          )}
          <ListItem sx={{ padding: "0px" }}>
            <ListItemText primary="Shipping" />
            <ListItemText sx={{ textAlign: "right" }}>
              {finalListOfItems?.live?.shipping?.price?.raw == 0
                ? `Free`
                : finalListOfItems?.live?.shipping?.price
                    ?.formatted_with_symbol}
            </ListItemText>
          </ListItem>
          <hr />

          <ListItem sx={{ padding: "0px" }}>
            <ListItemText
              primary="Total"
              secondary={`Including ${finalListOfItems?.live?.tax?.amount?.formatted_with_symbol} in taxes`}
            />
            <ListItemText
              sx={{
                textAlign: "right",
                "&>span": {
                  fontSize: "1.5rem",
                  fontWeight: 700,
                },
              }}
            >
              {finalListOfItems?.live?.total_with_tax?.formatted_with_symbol}
            </ListItemText>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default OrderReview;
