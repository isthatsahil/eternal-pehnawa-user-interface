import { useState, useEffect } from "react";
import { useGenrateCheckoutTokenMutation } from "../../redux/services/checkout";
import { useAddToCartMutation } from "../../redux/services/cart";
import CheckoutStepperComponent from "./CheckoutStepperComponent";
import { commerce } from "../../lib/commerce";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { setCheckoutTokenHelper } from "../../redux/services/checkoutHelper.js";
const CheckoutStepperContainer = () => {
  const dispatch = useDispatch();
  const [generateCheckoutToken] = useGenrateCheckoutTokenMutation();
  const [trigger, { data }] = useAddToCartMutation({
    fixedCacheKey: "cart",
  });
  const [checkoutToken, setCheckoutToken] = useState(null);
  const cart = data?.cart;
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart?.id, {
          type: "cart",
        });
        setCheckoutToken(token);
        dispatch(setCheckoutTokenHelper(token));
      } catch (error) {
        console.log("Checkout token error", error);
      }
    };
    generateToken();
  }, [cart]);

  return (
    <>
      {checkoutToken ? (
        <CheckoutStepperComponent checkoutToken={checkoutToken} />
      ) : (
        <div
          style={{
            height: "90vh",
            width: "90vw",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default CheckoutStepperContainer;
