import React from "react";
import { Typography, Autocomplete, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const useStyles = makeStyles((theme: any) => ({
  filterTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1rem 0rem 2rem",
    "& .MuiTypography-root": {
      fontSize: "clamp(14px, 4vw, 1rem)",
    },
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
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none", //remove input border
    },
  },
  view: {
    "&>*": {
      margin: "5px",
    },
  },
  sort: {
    "& .MuiAutocomplete-root": {
      width: "12rem",
      marginLeft: "1rem",
    },
  },
  tab:{
    border: "1px solid #000000",
    borderRadius: "5px",
  },
  selectedTab: {
    border: "1px solid #000000",
    borderRadius: "5px",
    backgroundColor: "black",
    color: "white",
  }
}));


const FilterTop = ({ view, setView }: { view: String; setView: Function }) => {
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
        <GridViewRoundedIcon
          className={`${view === "grid" ? classes.selectedTab : classes.tab}`}
          onClick={() => setView("grid")}
        />
        <MenuRoundedIcon
          className={`${view === "list" ? classes.selectedTab : classes.tab}`}
          onClick={() => setView("list")}
        />
      </div>
      <div></div>
      <div className={classes.sort}>
        <Typography>Sort by</Typography>
        <Autocomplete
          options={sortOptions}
          defaultValue={sortOptions[0]}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
      </div>
    </section>
  );
};

export default FilterTop;
