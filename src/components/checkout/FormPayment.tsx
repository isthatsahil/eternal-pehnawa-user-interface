import { Button, TextField, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { commerce } from "../../lib/commerce";
import { useDeleteCartMutation } from "../../redux/services/cart";
import { useHistory } from "react-router-dom";
import { setCaptureOrderHelper } from "../../redux/services/captureOrder.js";
import { LoadingButton } from "@mui/lab";

const useStyles = makeStyles((theme: any) => ({
  btnGrpContainer: {
    display: "flex",
    margin: "3rem 0rem",
  },
}));
const FormPayment = ({ backStep, customerShippingData, nextStep }) => {
  const classes = useStyles();
  const history = useHistory();
  const disptach = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBtn, setIsLoadingBtn] = useState(true);
  const checkoutToken = useSelector(
    (state: any) => state.checkoutHelper.checkoutToken
  );
  const [deleteCart, { data }] = useDeleteCartMutation({
    fixedCacheKey: "cart",
  });

  useEffect(() => {
    const setInter = setTimeout(() => setIsLoadingBtn(false), 5100);
    return () => {
      clearTimeout(setInter);
    };
  }, []);

  const completeOrder = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    const headers = {
      "content-type": "text/plain",
    };

    try {
      const data = await axios.post(
        "https://youthful-kirch-24c6e7.netlify.app/.netlify/functions/razorpay",
        {
          orderAmount: checkoutToken?.live?.total_with_tax?.raw,
        },
        { headers }
      );
      const orderDetails = data.data;
      setIsLoading(true);
      const options = {
        key: checkoutToken?.gateways?.config?.key_id, // Enter the Key ID generated from the Dashboard
        name: "Eternal Pehnawa",
        currency: orderDetails.currency,
        amount: orderDetails.amount,
        order_id: orderDetails.id,
        description: "Thankyou for your test donation",
        image: "https://manuarora.in/logo.png",
        handler: async function (response) {
          // Validate payment at server - using webhooks is a better idea.
          const orderDetails = {
            line_items: checkoutToken?.live?.line_items,
            customer: {
              firstname: customerShippingData?.firstName,
              lastname: customerShippingData?.lastName,
              email: customerShippingData?.email,
            },
            shipping: {
              name: "Primary",
              street: customerShippingData?.address,
              town_city: customerShippingData?.city,
              county_state: customerShippingData?.shippingSubdivision,
              postal_zip_code: customerShippingData?.pincode.toString(),
              country: customerShippingData?.shippingCountry,
            },
            fulfillment: {
              shipping_method: customerShippingData?.shippingOption,
            },
          };
          try {
            const capturedOrder = await commerce.checkout.capture(
              checkoutToken?.id,
              {
                ...orderDetails,
                payment: {
                  gateway: "razorpay",
                  razorpay: {
                    payment_id: response.razorpay_payment_id,
                  },
                },
              }
            );
            deleteCart({ cartId: checkoutToken?.cart_id });
            disptach(setCaptureOrderHelper(capturedOrder));
            history.push(`/confirmation/${capturedOrder}`);
          } catch (error) {
            setIsLoading(false);
          }

          //nextStep();
        },
        prefill: {
          name: `${customerShippingData.firstName} ${customerShippingData.lastName}`,
          email: customerShippingData.email,
          contact: customerShippingData.phone,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      setIsLoading(false);
      alert("Something went wrong with checkout !! Please try again");
    }
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  return (
    <>
      {isLoading ? (
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
      ) : (
        <div>
          <div style={{ marginBottom: "2rem" }}>
            <Typography variant="h6">Payment options</Typography>
            <Typography variant="body1" sx={{ fontSize: "14px" }}>
              All transactions are secure and encrypted.
            </Typography>
          </div>
          <div>
            {checkoutToken &&
              checkoutToken?.gateways?.map((gateway: any) => {
                if (!gateway?.sandbox) {
                  return (
                    <Accordion
                      key={gateway?.id}
                      defaultExpanded
                      sx={{ boxShadow: "none", border: "1px solid #d9d9d9" }}
                    >
                      <AccordionSummary>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={gateway?.code}
                            name="radio-buttons-group"
                          >
                            <FormControlLabel
                              value={gateway?.code}
                              control={
                                <Radio size="small" sx={{ color: "black" }} />
                              }
                              label={
                                gateway?.sandbox ? (
                                  "Test Payment"
                                ) : (
                                  <img
                                    src={
                                      "https://cdn.shopify.com/s/files/applications/e273f27d4c4fa65fc8e2af05e552f04e.png?height=24&1637057371"
                                    }
                                  />
                                )
                              }
                            />
                          </RadioGroup>
                        </FormControl>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          backgroundColor: "#FAFAFA",
                          borderTop: "1px solid #d9d9d9",
                        }}
                      >
                        <div style={{ padding: "1.5rem" }}>
                          <div
                            style={{
                              padding: "1.5rem 4.5rem",
                              textAlign: "center",
                            }}
                          >
                            <img
                              src={
                                "https://cdn.shopify.com/shopifycloud/shopify/assets/checkout/offsite-908d79d8d532f6af67d7cc99244ede733729c29379c349ee015fbcea71fd8274.svg"
                              }
                              style={{ marginBottom: "1rem" }}
                            />
                            <Typography variant="subtitle2" gutterBottom>
                              After clicking “Complete order”, you will be
                              redirected to Razorpay (Cards, UPI, NetBanking,
                              Wallets, Paypal) to complete your purchase
                              securely.
                            </Typography>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  );
                }
              })}
            <div className={classes.btnGrpContainer}>
              {isLoadingBtn ? (
                <LoadingButton loading variant="outlined">
                  Submit
                </LoadingButton>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    marginRight: "1rem",
                    backgroundColor: "black",
                    padding: "1.4rem 1.7rem",
                    borderRadius: "5px",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                  }}
                  size="large"
                  onClick={() => completeOrder()}
                >
                  Complete Order
                </Button>
              )}

              <Button
                variant="text"
                sx={{ textTransform: "none", color: "black" }}
                size="small"
                onClick={backStep}
              >
                Return to Information
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormPayment;
