import CheckoutForm from "@components/checkout/CheckoutForm";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import NavbarLogo from "@components/navbar/NavbarLogo";

import { commerce } from "../../lib/commerce";
import OrderReview from "@components/checkout/OrderReview";
import Confirmation from "@components/checkout/Confirmation";
const useStyles = makeStyles((theme: any) => ({
  header: {
    width: "90vw",
    height: "auto",
    margin: "0 auto 0 auto",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  nav: {
    width: "90vw",
    height: "auto",
    margin: "0 auto 0 auto",
    display: "flex",
    flexDirection: "row",
  },
  left: {
    width: "60%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  right: {
    width: "40%",

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));
const CheckoutStepperComponent = ({ checkoutToken }) => {
  const classes = useStyles();
  const [updatedCheckout, setUpdatedCheckout] = useState({});
  const [isTaxSet, setIsTaxSet] = useState(false);
  const [isDiscountValid, setIsDiscountValid] = useState(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const setTaxZone = async (checkoutTokenId, country) => {
    const response = await commerce.checkout.setTaxZone(checkoutTokenId, {
      country: country,
    });
    console.log("Tax", response);
    setUpdatedCheckout(response);
    setIsTaxSet(true);
  };

  const getShippingMethod = async (
    checkoutTokenId,
    shippingOption,
    country,
    region = null
  ) => {
    const response = await commerce.checkout.checkShippingOption(
      checkoutTokenId,
      {
        shipping_option_id: shippingOption,
        country: country,
        region: region,
      }
    );
    console.log("shipping in comp", response);
    setTaxZone(checkoutTokenId, country);
  };

  const handleDiscount = async (checkoutTokenId, discountCode) => {
    try {
      const response = await commerce.checkout.checkDiscount(checkoutTokenId, {
        code: discountCode,
      });
      console.log("dsicont", response);
      setUpdatedCheckout(response);
      setIsDiscountValid(true);
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleIsCheckoutSuccess = (value) => {
    setIsCheckoutSuccess(value);
  };
  const Nav = () => {
    return (
      <header style={{ marginBottom: "2rem" }}>
        <div className={classes.nav}>
          <div style={{ padding: "1rem" }}>
            <NavbarLogo />
          </div>
        </div>
      </header>
    );
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        height: "100vh",
        overflowY: "scroll",
        paddingBottom: "2rem",
      }}
    >
      <>
        <Nav />
        {isCheckoutSuccess ? (
          <Confirmation />
        ) : (
          <main className={classes.header}>
            <div className={classes.left}>
              <CheckoutForm
                checkoutToken={checkoutToken}
                setTaxZone={setTaxZone}
                getShippingMethod={getShippingMethod}
                handleIsCheckoutSuccess={handleIsCheckoutSuccess}
              />
            </div>
            <div className={classes.right}>
              <OrderReview
                isTaxSet={isTaxSet}
                checkoutToken={checkoutToken}
                updatedToken={updatedCheckout}
                handleDiscount={handleDiscount}
                isDiscountValid={isDiscountValid}
              />
            </div>
          </main>
        )}
      </>
      {/* {isCheckoutSuccess ? (
        <Confirmation />
      ) : (
        <>
          {" "}
          <Nav />
          <main className={classes.header}>
            <div className={classes.left}>
              <CheckoutForm
                checkoutToken={checkoutToken}
                setTaxZone={setTaxZone}
                getShippingMethod={getShippingMethod}
                handleIsCheckoutSuccess={handleIsCheckoutSuccess}
              />
            </div>
            <div className={classes.right}>
              <OrderReview
                isTaxSet={isTaxSet}
                checkoutToken={checkoutToken}
                updatedToken={updatedCheckout}
                handleDiscount={handleDiscount}
                isDiscountValid={isDiscountValid}
              />
            </div>
          </main>
        </>
      )} */}
    </div>
  );
};

export default CheckoutStepperComponent;
