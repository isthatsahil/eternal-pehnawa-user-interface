import { makeStyles } from "@mui/styles";
import { Grid, Typography, Button } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { FormEvent, useState } from "react";
import Alert from "@mui/material/Alert";
import { NavLink } from "react-router-dom";
const useStyles = makeStyles(
  (theme: { breakpoints: { down: (arg0: string) => any } }) => ({
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
      textDecoration: "none",
      "&>*": {
        margin: "3px 14px 3px 0px",
      },
      "& #facebook": {
        transition: ".5s ease",
        "&:hover": {
          color: "#4966AA",
        },
      },
      "& #instagram": {
        transition: ".5s ease",
        "&:hover": {
          color: "#C135A9",
        },
      },
      "& #youtube": {
        transition: ".5s ease",
        "&:hover": {
          color: "#FE0101",
        },
      },
      "& #pinterest": {
        transition: ".5s ease",
        "&:hover": {
          color: "#B6091B",
        },
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

      "& input:focus": {
        outline: "none",
      },
    },

    btn: {
      backgroundColor: "#2D2C2D",
      color: "#f8f8f8",
      width: "7.5rem",
      padding: "0.5rem 1rem",
      borderRadius: "2px",
      border: "2px solid #ffff",
      "&:hover": {
        backgroundColor: "#ffff",
        color: "#191919 !important",
        border: "2px solid #191919",
      },
    },
    alert: {
      width: "80%",
      margin: "0 auto 2rem",
      [theme.breakpoints.down("md")]: {
        margin: "0 0 2rem",
      },
    },
    links: {
      textDecoration: "none",
      color: "#f8f8f8",
      "&:hover": {
        color: "#DFC387",
      },
    },
    linkIcons:{
      color: "inherit",
      textDecoration: "none",
    },
  })
);

const Footer = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWarning, setIsWaring] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleFormSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email === "") {
      setIsWaring(true);
    } else {
      const xhr = new XMLHttpRequest();
      const url =
        "https://api.hsforms.com/submissions/v3/integration/submit/24922992/fdf8e4f4-2dbe-4bef-9eb5-803d30e48216";
      const data = {
        fields: [
          {
            name: "email",
            value: email,
          },
        ],
        context: {
          pageUri: "eternal-pehnawa.netlify.app",
          pageName: "Eternal Pehnawa",
        },
      };
      const final_data = JSON.stringify(data);
      xhr.open("POST", url);
      // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          setIsSuccess(true);
        } else if (xhr.readyState === 4 && xhr.status === 403) {
          setIsError(true);
          setErrorMessage("xhr.responseText");
          //alert(xhr.responseText); // Returns a 403 error if the portal isn't allowed to post submissions.
        } else if (xhr.readyState === 4 && xhr.status === 404) {
          setIsError(true);
          setErrorMessage("xhr.responseText");
        }
      };

      // Sends the request
      xhr.send(final_data);
      setEmail("");
    }
  };

  const handleClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSuccess(false);
  };
  return (
    <footer>
      <div className={classes.top}>
        <Typography className={classes.title}>
          SECURE PAYMENT OPTIONS
        </Typography>
        <div className={classes.paymentLogosContainer}>
          <img
            src={
              "https://res.cloudinary.com/cryptomonthly/image/upload/v1643465008/eternal_pehnawa/mastercard_hsiq8x.png"
            }
            alt="master-card"
          />
          <img
            src={
              "https://res.cloudinary.com/cryptomonthly/image/upload/v1643465008/eternal_pehnawa/visa_opdb6x.png"
            }
            alt="visa-card"
          />
          <img
            src={
              "https://res.cloudinary.com/cryptomonthly/image/upload/v1643465008/eternal_pehnawa/razorpay_tf9f7z.png"
            }
            alt="razorpay"
          />
        </div>
      </div>
      <Grid container className={classes.bottom} justifyContent="space-between">
        <Grid item sm={8} md={3}>
          <Typography className={classes.title}>
            help &#38; information
          </Typography>
          <div>
            <NavLink to="/contact-us" className={classes.links}>
              <Typography>Delivery and Shipping</Typography>
            </NavLink>
            <NavLink to="/contact-us" className={classes.links}>
              <Typography>Return and Exchanges</Typography>
            </NavLink>
          </div>
        </Grid>
        <Grid sm={2} item md={3}>
          <div>
            <Typography className={classes.title}>Areas</Typography>
            <NavLink to="/about" className={classes.links}>
              <Typography>About Us</Typography>
            </NavLink>
            <NavLink to="/all-products" className={classes.links}>
              <Typography>Products</Typography>
            </NavLink>
            <NavLink to="/contact-us" className={classes.links}>
              <Typography>Contact Us</Typography>
            </NavLink>
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
              <a
                className={classes.linkIcons}
                href="https://m.facebook.com/pehnawabhopal"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <span id="facebook">
                  <FacebookIcon />
                </span>
              </a>
              <a
                className={classes.linkIcons}
                href="https://www.instagram.com/eternalpehnawa/"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <span id="instagram">
                <InstagramIcon />
              </span>
              </a>
             
              <span id="youtube">
                <YouTubeIcon />
              </span>
            </div>
          </div>
          <div>
            <Typography className={classes.title}>Newsletter </Typography>
            <Typography>
              Subscribe to our newsletter to be informed about new products.
            </Typography>
            <div className={classes.newsLetter}>
              {isSuccess ? (
                <div className={classes.alert}>
                  <Alert onClose={handleClose} severity="success">
                    Thanks for subscribing!
                  </Alert>
                </div>
              ) : isWarning ? (
                <div className={classes.alert}>
                  <Alert onClose={handleClose} severity="warning">
                    Please enter a valid email address.
                  </Alert>
                </div>
              ) : isError ? (
                <div className={classes.alert}>
                  <Alert onClose={handleClose} severity="error">
                    {errorMessage}
                  </Alert>
                </div>
              ) : (
                ""
              )}
              <form noValidate autoComplete="off" onSubmit={handleFormSubmit}>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className={classes.btn}>
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
