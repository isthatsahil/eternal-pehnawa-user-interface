import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import ComplexButton from "./ComplexButton";
import { useGetAllCategoriesQuery } from "../../redux/services/products";

const CategoryList = () => {
  const { data } = useGetAllCategoriesQuery("");
  return (
    <div style={{ marginTop: "6rem" }}>
      <Grid container spacing={3}>
        {data?.data?.map((category: any) => (
          <Grid item xs={12} md={6} lg={4} xl={4} key={category.name}>
            <Link to={`/all-products/category/${category.slug}`}>
              <ComplexButton data={category} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CategoryList;
