import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  logo: {
    "&>a": {
      fontWeight: "700",
      textDecoration: "none",
      color: "#191919",
    },
  },
});
const NavbarLogo = () => {
  const classes = useStyles();
  return (
    <div className={classes.logo}>
      <Link to="/">Eternal Pehnawa</Link>
    </div>
  );
};

export default NavbarLogo;
