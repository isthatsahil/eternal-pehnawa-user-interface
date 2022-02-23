import React from "react";
import Navbar from "@components/navbar/Navbar";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
    width: "60vw",
    fontSize: "1.5rem",
    margin: "2rem auto",
    lineSpacing: "1rem",
    "&::first-letter": {
      fontSize: "5rem",
      fontWeight: "bold",
    },
    "& a": {
      color: "#FC7500",
    },
    "& p": {
      wordBreak: "break-all",
    },
    [theme.breakpoints.between("sm", "md")]: {
      margin: "2rem 5rem",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "2rem 2rem",
    },
  },
}));

const AboutComponent = () => {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <div className={classes.root}>
        Eternal Pehnawa is an exclusive store providing a wide range of Indian
        ethnic wear. EP act as a connector between customer and artisans &
        craftsmen from all over India at your doorsteps. It offers you to the
        most beautiful and handcrafted India’s heritage products from corners of
        India like Banarasi, Maheshwari, Chanderi, Handlooms, Cotton, Ikkat,
        Linen, Khadis, Tussar, Mursidabad, Kalamkari, Block print and more. We
        revolutionize fashion among all age group women at addictive prices and
        unbeatable quality. EP is customer centric with aim to provide best
        possible services to our customers and also welcome new ideas and
        suggestions from our customer so we can grow enough to meet customer
        expectations.
        <br />
        <br />
        <strong>HAPPY SHOPPING!</strong>
      </div>
    </>
  );
};

export default AboutComponent;
