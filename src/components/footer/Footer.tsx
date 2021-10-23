import { makeStyles } from "@mui/styles";
import mastercardLogo from "../../assets/payment-options-logo/mastercard.png";
import { Grid, Typography, Button } from "@mui/material";
import visacardLogo from "../../assets/payment-options-logo/visa.png";
import paypalLogo from "../../assets/payment-options-logo/paypal.png";
import razorpayLogo from "../../assets/payment-options-logo/razorpay.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";

const useStyles = makeStyles({
  top: {
    height: "8rem",
    backgroundColor: "#2D2C2D",
    padding: "1rem 5vw",
  },
  bottom: {
    // height: "20rem",
    backgroundColor: "#343435",
    padding: "0 5vw",
    "&>div>div": {
      margin: "0rem 0rem 1.5rem",
      color: "#ececec",
      fontWeight: "100 !important",
    },
  },
  paymentLogosContainer: {
    display: "flex",
    "& img": {
      height: "23px",
      backgroundColor: "#484949",
      margin: "2px",
      padding: "2px 3px",
      borderRadius: "2px",
    },
  },
  title: {
    textTransform: "uppercase",
    color: "#f8f8f8",
    fontSize: "14px !important",
    letterSpacing: "1px !important",
    fontWeight: "700 !important",
    margin: "1rem 0 !important",
  },
  socialMediaIcons: {
    "&>*": {
      margin: "3px 14px 3px 0px",
    },
  },
  newsLetter: {
    margin: "1rem 0rem",
    "& input": {
      width: "15rem",
      height: "2.5rem",
      margin: "0rem 0.5rem 0.5rem 0rem",
      padding: "0 10px",
    },
    "& button": {
      border: "2px solid #ffff",
      borderRadius: "0",
      color: "#ffff !important",
      transition: "all ease .5s",
      "&:hover": {
        backgroundColor: "#ffff",
        color: "#191919 !important",
        border: "2px solid #191919",
      },
    },
    "& input:focus": {
      outline: "none",
    },
  },
});

const Footer = () => {
  const classes = useStyles();
  return (
    <footer>
      <div className={classes.top}>
        <Typography className={classes.title}>
          SECURE PAYMENT OPTIONS
        </Typography>
        <div className={classes.paymentLogosContainer}>
          <img src={mastercardLogo} alt="master-card" />
          <img src={visacardLogo} alt="visa-card" />
          <img src={paypalLogo} alt="paypal" />
          <img src={razorpayLogo} alt="razorpay" />
        </div>
      </div>
      <Grid container className={classes.bottom} justifyContent="space-between">
        <Grid item sm={8} md={3}>
          <Typography className={classes.title}>
            help &#38; information
          </Typography>
          <div>
            <Typography>FAQ</Typography>
            <Typography>Delivery and Shipping</Typography>
            <Typography>Return and Exchanges</Typography>
          </div>
          <div>
            <Typography>Revocation</Typography>
            <Typography>Data Protection</Typography>
            <Typography>Conditions</Typography>
            <Typography>Imprint</Typography>
            <Typography>Sitemap</Typography>
          </div>
        </Grid>
        <Grid sm={2} item md={3}>
          <div>
            <Typography className={classes.title}>Areas</Typography>
            <Typography>Home</Typography>
            <Typography>Products</Typography>
            <Typography>Story</Typography>
            <Typography>Journal</Typography>
            <Typography>Contact</Typography>
          </div>
          <div>
            <Typography className={classes.title}>Account</Typography>
            <Typography>My Account</Typography>
            <Typography>Orders</Typography>
          </div>
        </Grid>
        <Grid sm={5} item md={4}>
          <div>
            <Typography className={classes.title}>social media</Typography>
            <div className={classes.socialMediaIcons}>
              <FacebookIcon />
              <InstagramIcon />
              <YouTubeIcon />
              <PinterestIcon />
            </div>
          </div>
          <div>
            <Typography className={classes.title}>SIGN up </Typography>
            <Typography>
              Subscribe to our newsletter to be informed about new products.
            </Typography>
            <div className={classes.newsLetter}>
              <input name="email" type="email" placeholder="Email Address" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
