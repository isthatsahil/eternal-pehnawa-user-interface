import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
  header: {
    padding: "0.7rem 5vw",
    backgroundColor: "#EBDED6",
    textTransform: "capitalize",
    "& *": {
      fontSize: "1rem !important",
      fontWeight: "500 !important",
    },
    "& a": {
      color: "#795744",
      textDecoration: "none",
    },
  },
});

const Header = ({ path = null }) => {
  const classes = useStyles();
  const location = useLocation();

  const paths = path ? path.split("/") : location.pathname.split("/");

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
