import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Tabs, Tab } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import General from "./General.jsx";
import FaceIcon from "@mui/icons-material/Face";
import Order from "./Order.jsx";
const usestyles = makeStyles((theme) => ({
  root: {
    width: "90vw",
    margin: "4rem auto",
    height: "auto",
    [theme.breakpoints.down("md")]: {
      margin: "1rem",
    },
    [theme.breakpoints.down(400)]: {
      margin: "0.5rem",
    },
  },
  breadcrumbs: {
    marginTop: "0.7rem",
  },
  links: {
    color: "#4754B0",
    "&:hover": {
      color: "#FC7500",
    },
  },
  tabs: {
    marginTop: "2rem",
    "& .MuiTabs-indicator": {
      backgroundColor: "#1890ff",
    },
    borderBottom: "1px solid #a2a2a2",
  },
  container: {
    marginTop: "2rem",
  },
}));

const Account = ({ user }) => {
  const classes = usestyles();
  const [tabValue, setTabValue] = useState("general");
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const BreadCrumb = () => {
    return (
      <Breadcrumbs
        separator={<NavigateNextIcon />}
        className={classes.breadcrumbs}
      >
        <Link className={classes.links} to="/portfolio">
          Portfolio
        </Link>
        <Link className={classes.links} to="/portfolio/account">
          Account
        </Link>
      </Breadcrumbs>
    );
  };

  return (
    <div className={classes.root}>
      {/* <PageHeader
        title="Account"
        isSub={false}
        breadCrumb={<BreadCrumb />}
        subtitle=""
        icon={<FaceIcon fontSize="large" />}
      /> */}
      <Tabs value={tabValue} onChange={handleChange} className={classes.tabs}>
        <Tab value="general" label="general" />
        <Tab value="orders" label="orders" />
      </Tabs>
      <div className={classes.container}>
        {tabValue === "general" ? (
          <General user={user} />
        ) : (
          <Order user={user} />
        )}
      </div>
    </div>
  );
};

export default Account;
