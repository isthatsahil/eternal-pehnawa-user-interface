import { makeStyles } from "@mui/styles";
import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

const useStyles = makeStyles((theme: any) => ({
  linkButton: {
    backgroundColor: "#AA7B5F !important", //button color
    textTransform: "capitalize !important",
  },
}));
const LinkButton = ({ children, to }: { children: String; to: String }) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      component={NavLink}
      to={to}
      className={classes.linkButton}
    >
      {children}
    </Button>
  );
};

export default LinkButton;
