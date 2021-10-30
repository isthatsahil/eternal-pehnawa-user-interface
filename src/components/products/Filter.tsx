import {
  Tabs,
  Typography,
  Tab,
  Checkbox,
  Slider,
  TextField,
  FormControlLabel,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";

const useStyles = makeStyles(() => ({
  root: {
    padding: "0rem 1rem 1rem 0rem",
    marginRight: "1rem",
    position: "sticky",
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
      margin: "1.5rem 0rem",
    },
    "& .MuiFormControlLabel-root": {
      margin: "0",
    },
  },
  searchBox: {
    margin: "1rem",
    backgroundColor: "#F0F5F9",
  },
  label: {
    marginBottom: "0.5rem !important",
    fontWeight: "600 !important",
  },
  clearFilterBtnContainer: {
    "& button": {
      backgroundColor: "#BB2525",
      textTransform: "capitalize",
      letterSpacing: "2px",
    },
    "& button:hover": {
      backgroundColor: "#dc7171",
    },
  },
  colorOptions: {
    display: "flex",
    "&>*": {
      fontSize: "1rem",
      width: "1.5rem",
      height: "1.5rem",
    },
  },
}));

// const productColors = ["#FF8080", "#80FF80", "#8181FF", "#808181", "#FFDD81"];

const productColors = [
  { name: "red", value: "#FF0101" },
  { name: "green", value: "#01FF01" },
  { name: "blue", value: "#0100FE" },
  { name: "black", value: "#010001" },
  { name: "yellow", value: "#FFB900" },
];

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
        <Typography className={classes.label}>Category</Typography>
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
          <Tab component={NavLink} to="/saree" label="Saree" value="/saree" />
          <Tab component={NavLink} to="/suit" label="Suit" value="/suit" />
          <Tab
            component={NavLink}
            to="/home-decor"
            label="Home Decor"
            value="/home-decor"
          />
        </Tabs>
      </div>

      <div>
        <Typography className={classes.label}>Color</Typography>
        <div className={classes.colorOptions}>
          <div>All</div>
          {productColors.map((color: any) => (
            <Checkbox
              key={color.name}
              icon={<CircleIcon style={{ color: color.value }} />}
              checkedIcon={<CheckCircleIcon style={{ color: color.value }} />}
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

      <div>
        <FormControlLabel
          control={<Checkbox />}
          label="Free Shipping"
          labelPlacement="start"
        />
      </div>

      <div className={classes.clearFilterBtnContainer}>
        <Button variant="contained">Clear Filters</Button>
      </div>
    </div>
  );
};

export default Filter;
