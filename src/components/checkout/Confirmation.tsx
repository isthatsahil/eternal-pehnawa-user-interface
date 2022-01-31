import NavbarLogo from "@components/navbar/NavbarLogo";
import { Typography, Paper, Icon, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const useStyles = makeStyles((theme: any) => ({
  header: {
    width: "60vw",
    backgroundColor: "#fff",

    margin: "0 auto 0 auto",
  },
  nav: {
    width: "90vw",
    height: "auto",
    margin: "0 auto 0 auto",
    display: "flex",
    flexDirection: "row",
  },
}));
const Confirmation = () => {
  const classes = useStyles();
  const capturedOrder = useSelector(
    (state: any) => state.capturedOrder.capturedOrder
  );

  console.log("confirmation", capturedOrder);
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
        backgroundColor: "#E7EBEF",
        height: "100vh",
        overflowY: "scroll",
        paddingBottom: "2rem",
      }}
    >
      <Nav />
      <div className={classes.header}>
        <Paper elevation={3} sx={{ padding: "8px", height: "400px" }}>
          <div style={{ padding: "4rem", textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <Icon color="success" sx={{ width: "65px", height: "65px" }}>
                <CheckCircleOutlineIcon
                  sx={{ width: "65px", height: "65px" }}
                />
              </Icon>

              <Typography variant="h6" gutterBottom>
                Thank you for your purchase,{" "}
                {capturedOrder?.customer?.firstname}{" "}
                {capturedOrder?.customer?.lastname}!
              </Typography>
            </div>
            <div>
              <Typography variant="body1" gutterBottom sx={{ color: "green" }}>
                Your order has been successfully placed.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Your order number is:{" "}
                <strong>{capturedOrder?.customer_reference}</strong>
              </Typography>

              <Button
                component={NavLink}
                to="/"
                variant="contained"
                sx={{ marginTop: "1rem" }}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Confirmation;
