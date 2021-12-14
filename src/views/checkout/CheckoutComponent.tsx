import React, { useEffect } from "react";
import { Typography, Divider, TextField, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LockIcon from "@mui/icons-material/Lock";

const useStyles = makeStyles((theme: any) => ({
  container: {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    textAlign: "center !important",
    // margin: "0 20vw",
    margin: "auto",
    "& .MuiTypography-h2": {
      margin: "auto",
    },
  },
  title: {
    [theme.breakpoints.down("md")]: {
      fontSize: "3rem !important",
    },
  },
  orderTotal: {
    backgroundColor: "#ffff",
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
    [theme.breakpoints.down("sm")]: {
      width: "92%",
    },
  },
  customerDetailsForm: {
    "& .MuiTextField-root": {
      // margin: "0.4rem",
      backgroundColor: "#ffff",
      width: "100%",
    },
  },
  completePurchaseButton: {
    width: "20rem",
    height: "5rem",
    fontSize: "1.3rem",
    fontWeight: "500",
    borderRadius: "2rem",
    backGroundColor: "#EFEFEF",
    margin: "1rem",
    border: "2px solid black",
    [theme.breakpoints.down("md")]: {
      width: "15rem",
      height: "3.5rem",
      fontSize: "1rem",
    },
  },
}));

const CheckoutComponent = ({ checkoutData }: { checkoutData: any }) => {
  const classes = useStyles();
  useEffect(() => {
    console.log(checkoutData);
  }, []);
  return (
    <Grid container justifyContent="center">
      <Grid item className={classes.container} xs={11} sm={10} md={9} lg={6}>
        <Grid container>
          <Typography className={classes.title} variant="h2">
            Secured Checkout
          </Typography>
          <Typography variant="h6" style={{ margin: "1.5rem" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            mollitia deserunt quam quod aperiam necessitatibus.
          </Typography>
          <div className={classes.orderTotal}>
            <Typography>
              <span>Subtotal :</span>
              <span>{checkoutData.live.subtotal.formatted_with_symbol}</span>
            </Typography>
            <Typography>
              <span>Tax :</span>
              <span>{checkoutData.live.tax.amount.formatted_with_symbol}</span>
            </Typography>
            <Typography>
              <span>Shiping fee :</span>
              <span>
                {checkoutData.live.shipping.price.formatted_with_symbol}
              </span>
            </Typography>
            <Divider />
            <Typography>
              <span>Order Total :</span>
              <span>
                {checkoutData.live.total_with_tax.formatted_with_symbol}
              </span>
            </Typography>
          </div>
          <div>
            <Typography
              variant="h5"
              style={{ textAlign: "left", margin: "1rem 0" }}
            >
              Customer details
            </Typography>
            <Grid container className={classes.customerDetailsForm} spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField label="First name" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Last name" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Email" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Phone number" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField label="Shipping address" variant="outlined" />
              </Grid>
            </Grid>
          </div>
          <div>
            <Typography
              variant="h5"
              style={{ textAlign: "left", margin: "1rem 0" }}
            >
              Payment options
            </Typography>
          </div>
        </Grid>
        <button className={classes.completePurchaseButton}>
          <LockIcon />
          COMPLETE PURCHASE
        </button>
        <Typography variant="h6" style={{ margin: "1rem" }}>
          All transactions are safe & secured by 2048 bit SSL encryption.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CheckoutComponent;
