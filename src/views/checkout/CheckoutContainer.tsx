import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutComponent from "./CheckoutComponent";
import { useGenrateCheckoutTokenMutation } from "../../redux/services/checkout";

const CheckoutContainer = () => {
  const [checkoutData, setCheckoutData] = useState(null as any);
  const cartId = useSelector(
    (state: any) => state.cart.queries['getCart("")']?.data?.id
  );

  const [generateCheckoutToken] = useGenrateCheckoutTokenMutation();

  useEffect(() => {
    generateCheckoutToken(cartId).then((response: any) => {
      setCheckoutData(response.data);
    });
  }, [cartId]);

  console.log("checkoutData", checkoutData);
  return (
    <>
      {checkoutData ? (
        <CheckoutComponent checkoutData={checkoutData} />
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default CheckoutContainer;
