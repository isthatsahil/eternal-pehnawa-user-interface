import {
  Tabs,
  Typography,
  Tab,
  Slider,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { clearFilter, updateFilter } from "../../redux/services/filter";
import {
  useGetAllCategoriesQuery,
  useGetEachCategoryMutation,
} from "../../redux/services/products";

const useStyles = makeStyles(() => ({
  root: {
    padding: "0rem 1rem 1rem 0rem",
    marginRight: "1rem",
    position: "sticky",
    top: 20,
    zIndex: 5,
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
}));

export const Filter = () => {
  const classes = useStyles();
  const location = useLocation();
  const { data: categories } = useGetAllCategoriesQuery("");
  const [categoryTabValue, setCategoryTabValue] = useState(location.pathname);
  const dispatch = useDispatch();
  const [getEachCategory, childCategory] = useGetEachCategoryMutation({
    fixedCacheKey: "myCaccaheKey",
  });

  React.useEffect(() => {
    const namePath = categoryTabValue.substring(
      categoryTabValue.lastIndexOf("/") + 1,
      categoryTabValue.length
    );
    if (namePath != null && namePath != undefined && namePath != "") {
      const categoryIdentiferId = categories?.data?.filter(
        (category: any) => category.slug === namePath
      );
      if (categoryIdentiferId) {
        getEachCategory(categoryIdentiferId[0]?.id);
      }
    }
  }, [categoryTabValue]);

  const { price, searchTerm, artisan, subCategory } = useSelector(
    (state: any) => state.filter
  );
  const products = useSelector(
    (state: any) => state.products.queries["getProducts(200)"]?.data?.data
  );

  const getArtisanList = () => {
    let artisanList = products?.map((product: any) => {
      return product.attributes.filter(
        (attribute: any) => attribute.name === "artisan"
      )[0].value;
    });
    artisanList = [...Array.from(new Set(artisanList))];
    artisanList.splice(artisanList.indexOf("Not available"), 1); //remove 'Not available' from artisan list
    artisanList.sort();
    artisanList.unshift("all"); // add 'all' as artisan option

    artisanList = artisanList?.map((artisan: string) => {
      return { label: artisan };
    });
    return artisanList;
  };

  const priceRange = price;

  const handleCategoryTabChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setCategoryTabValue(newValue);
    getEachCategory(newValue);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    // setPriceRange(newValue as number);
    dispatch(updateFilter({ price: newValue as number }));
  };

  const handleClearFilter = () => {
    dispatch(clearFilter());
  };

  const artisans = getArtisanList();

  const handleSearch = (event: any) => {
    dispatch(updateFilter({ searchTerm: event.target.value }));
  };

  const handleArtisansChange = (event: any, value: any, reason: string) => {
    if (reason === "selectOption") {
      dispatch(updateFilter({ artisan: value.label }));
    }
  };

  const handleSubCategoryChange = (event: any, value: string | null) => {
    dispatch(updateFilter({ subCategory: value }));
  };
  const getSubCategory = () => {
    const sublist: any[] = [];
    childCategory?.data?.children?.map((child: any) => {
      sublist.push(child.slug);
    });
    return sublist;
  };
  const subCategories = getSubCategory();
  return (
    <div className={classes.root}>
      <div>
        <TextField
          label="Search"
          variant="outlined"
          className={classes.searchBox}
          size="small"
          onChange={handleSearch}
          value={searchTerm}
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
            to="/all-products"
            label="All"
            value="/all-products"
          />
          {categories?.data?.map((category: any) => {
            return (
              <Tab
                key={category.id}
                component={NavLink}
                to={`/all-products/category/${category.slug}`}
                label={category.name}
                value={category.id}
              />
            );
          })}
        </Tabs>
      </div>

      {subCategories ? (
        <div>
          <Typography className={classes.label}>Sub categories</Typography>
          <Autocomplete
            options={subCategories}
            onChange={handleSubCategoryChange}
            renderInput={(params) => <TextField {...params} size="small" />}
            sx={{ maxWidth: "12rem" }}
            value={subCategory}
            fullWidth={true}
          />
        </div>
      ) : (
        <></>
      )}
      {/**
       * TODO :: Artisian filter if needed in future
       */}
      {/* <div>
        <Typography className={classes.label}>Artisan</Typography>
        <Autocomplete
          options={artisans}
          isOptionEqualToValue={(option: any, value: any) =>
            option.label === value.label
          }
          onChange={handleArtisansChange}
          renderInput={(params) => <TextField {...params} size="small" />}
          sx={{ maxWidth: "12rem" }}
          value={{ label: artisan }}
        />
      </div> */}

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

      <div className={classes.clearFilterBtnContainer}>
        <Button variant="contained" onClick={handleClearFilter}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export const MemoizedFilter = React.memo(Filter);
