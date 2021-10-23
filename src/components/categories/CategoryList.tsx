import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import saree from "../../assets/homepage/images/saree.jpg";
import suit from "../../assets/homepage/images/suits.jpg";
import homeDecor from "../../assets/homepage/images/homeDecor.jpg";
import ComplexButton from "./ComplexButton";
const categories = [
  {
    url: saree,
    title: "Saree",
    width: "100%",
    margin: "-3rem",
  },
  {
    url: suit,
    title: "Suits",
    width: "100%",
    margin: "0rem",
  },
  {
    url: homeDecor,
    title: "Home Decor",
    width: "100%",
    margin: "-3rem",
  },
];

const CategoryList = () => {
  return (
    <div style={{ marginTop: "6rem" }}>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} md={6} lg={4} xl={4} key={category.title}>
            <Link to={`product/categories/${category.title}`}>
              <ComplexButton data={category} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CategoryList;
