import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme: any) => {
  console.log({ theme });
  return {
    header: {
      padding: "1rem 5vw",
      backgroundColor: "#EBDED6",
      textTransform: "capitalize",
      "& *": {
        fontSize: "1.5rem !important",
        fontWeight: "600 !important",
      },
      "& a": {
        color: "#795744",
        textDecoration: "none",
      },
    },
  };
});

const Header = () => {
  const classes = useStyles();
  const location = useLocation();

  const paths = location.pathname.split("/");

  return (
    <div className={classes.header}>
      <Breadcrumbs aria-label="breadcrumb">
        {paths.map((path: string, index: number) => {
          return index === 0 ? (
            <NavLink key={index} to="/">
              home
            </NavLink>
          ) : index == paths.length - 1 ? (
            <Typography key={index} color="text.primary">
              {path}
            </Typography>
          ) : (
            <NavLink key={index} to={`/${path}`}>
              {path}
            </NavLink>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default Header;
