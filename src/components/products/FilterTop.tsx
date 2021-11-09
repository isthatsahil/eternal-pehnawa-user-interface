import React from "react";
import { Typography, Autocomplete, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../redux/services/filter";

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
  tab: {
    border: "1px solid #000000",
    borderRadius: "5px",
  },
  selectedTab: {
    border: "1px solid #000000",
    borderRadius: "5px",
    backgroundColor: "black",
    color: "white",
  },
}));

const FilterTop = () => {
  const classes = useStyles();
  const { view } = useSelector((state: any) => state.filter);
  const dispatch = useDispatch();

  const sortOptions = [
    {
      label: "Price (Lowest)",
      name: "price-lowest",
    },
    {
      label: "Price (Highest)",
      name: "price-highest",
    },
    {
      label: "Name (A - Z)",
      name: "name-atoz",
    },
    {
      label: "Name (Z - A)",
      name: "name-ztoa",
    },
  ];
  const handleChangeView = (value: string) => {
    dispatch(updateFilter({ view: value }));
  };
  const handleSortChange = (
    event: any,
    value: any,
    reason: string,
    details: any
  ) => {
    if (reason === "selectOption") {
      dispatch(updateFilter({ sort: value.name }));
    }
  };
  return (
    <section className={classes.filterTop}>
      <div className={classes.view}>
        <GridViewRoundedIcon
          className={`${view === "grid" ? classes.selectedTab : classes.tab}`}
          onClick={() => handleChangeView("grid")}
        />
        <MenuRoundedIcon
          className={`${view === "list" ? classes.selectedTab : classes.tab}`}
          onClick={() => handleChangeView("list")}
        />
      </div>
      <div></div>
      <div className={classes.sort}>
        <Typography>Sort by</Typography>
        <Autocomplete
          options={sortOptions}
          defaultValue={{
            label: "Price (Lowest)",
            name: "price-lowest",
          }}
          isOptionEqualToValue={(option: any, value: any) =>
            option.label === value.label
          }
          onChange={handleSortChange}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
      </div>
    </section>
  );
};

export default FilterTop;
