import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <Typography color="text.primary">All</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default Header;
