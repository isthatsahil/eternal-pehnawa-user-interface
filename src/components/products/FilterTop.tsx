import React from "react";
import { Typography, Autocomplete, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const useStyles = makeStyles(() => ({
  filterTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1rem 0rem 2rem",
    "&>div": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "&>div:nth-child(2)": {
      flexGrow: "1",
      backgroundColor: "grey",
      height: "1px",
      margin: "0 1rem",
    },
  },
  view: {
    "&>*": {
        margin: "5px",
    }
  },
  sort: {
    "& .MuiAutocomplete-root": {
      width: "12rem",
      marginLeft: "1rem",
    },
  },
}));

const FilterTop = () => {
  const classes = useStyles();

  const sortOptions = [
    {
      label: "Price (Lowest)",
    },
    {
      label: "Price (Highest)",
    },
    {
      label: "Name (A - Z)",
    },
    {
      label: "Name (Z - A)",
    },
  ];
  return (
    <section className={classes.filterTop}>
      <div className={classes.view}>
        <GridViewRoundedIcon />
        <MenuRoundedIcon />
      </div>
      <div></div>
      <div className={classes.sort}>
        <Typography>Sort by</Typography>
        <Autocomplete
          options={sortOptions}
          renderInput={(params) => (
            <TextField {...params} size="small" label="select" />
          )}
        />
      </div>
    </section>
  );
};

export default FilterTop;
