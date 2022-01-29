import { useForm, FormProvider, Controller } from "react-hook-form";
import Grid from "@mui/material/Grid";
import CustomTextField from "./CustomTextField";
import { Button, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { makeStyles } from "@mui/styles";

//const Razorpay = require("razorpay");
//import * as Razorpay from "razorpay";
const useStyles = makeStyles((theme: any) => ({
  btnGrpContainer: {
    display: "flex",
    margin: "3rem 0rem",
  },
}));
const FormPayment = ({ backStep, customerShippingData }) => {
  const classes = useStyles();
  const checkoutToken = useSelector(
    (state: any) => state.checkoutHelper.checkoutToken
  );
  console.log("inside payment", checkoutToken);

  return (
    <>
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
                            Wallets, Paypal) to complete your purchase securely.
                          </Typography>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                );
              }
            })}
          <div className={classes.btnGrpContainer}>
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
    </>
  );
};

export default FormPayment;
