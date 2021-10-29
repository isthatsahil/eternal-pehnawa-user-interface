import {
  Tabs,
  Typography,
  Tab,
  Checkbox,
  Slider,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";

const useStyles = makeStyles(() => ({
  root: {
    padding: "1rem",
    marginRight: "1rem",
    "& .MuiTab-root": {
      textAlign: "left !important",
      textTransform: "capitalize",
      "-webkit-align-items": "flex-start",
      padding: "0px",
      minHeight: "1.4rem",
    },
    "& .MuiTouchRipple-root": {
      backgroundColor: "none",
    },
    "&>div": {
      margin: "1.5rem 0rem"
    }
  },
  searchBox: {
    margin: "1rem",
  },
  label: {
    marginBottom: "0.5rem !important",
  }
}));

const productColors = ["#FF8080", "#80FF80", "#8181FF", "#808181", "#FFDD81"];

const Filter = () => {
  const classes = useStyles();
  const location = useLocation();
  const [categoryTabValue, setCategoryTabValue] = useState(location.pathname);
  const [priceRange, setPriceRange] = useState(500);

  const handleCategoryTabChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setCategoryTabValue(newValue);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number);
  };

  return (
    <div className={classes.root}>
      <div>
        <TextField
          label="Search"
          variant="outlined"
          className={classes.searchBox}
          size="small"
        />
      </div>

      <div>
        <Typography className={classes.label} >Category</Typography>
        <Tabs
          orientation="vertical"
          value={categoryTabValue}
          onChange={handleCategoryTabChange}
        >
          <Tab
            component={NavLink}
            to="/products"
            label="All"
            value="/products"
          />
          <Tab
            component={NavLink}
            to="/products/saree"
            label="Saree"
            value="/products/saree"
          />
          <Tab
            component={NavLink}
            to="/products/suit"
            label="Suit"
            value="/products/suit"
          />
          <Tab
            component={NavLink}
            to="/products/home-decor"
            label="Home Decor"
            value="/products/home-decor"
          />
        </Tabs>
      </div>

      <div>
        <Typography className={classes.label}>Color</Typography>
        <div>
          <div>All</div>
          {productColors.map((color: any) => (
            <Checkbox
              icon={<CircleIcon style={{ color: color }} />}
              checkedIcon={<CheckCircleIcon style={{ color: color }} />}
            />
          ))}
        </div>
      </div>

      <div>
        <Typography className={classes.label}>Price</Typography>
        <Typography> &#x20B9; {priceRange}</Typography>
        <Slider
          defaultValue={10000}
          min={0}
          max={20000}
          value={priceRange}
          onChange={handlePriceChange}
        />
      </div>
    </div>
  );
};

export default Filter;
