import { makeStyles } from "@mui/styles";
import CategoryList from "./CategoryList";

const useStyes = makeStyles({
  categoryContainer: {
    backgroundColor: "#f1f5f8 !important",
    height: "auto",
  },
  wrapper: {
    width: "90vw",
    margin: "4rem auto 0 auto",
    padding: "2rem 0",
  },
  categoryTitle: {
    textAlign: "center",

    "&>p": {
      fontSize: "2.5rem",
      lineHeight: "3rem",
    },
  },
});
const Category = () => {
  const classes = useStyes();
  return (
    <section className={classes.categoryContainer}>
      <div className={classes.wrapper}>
        <div className={classes.categoryTitle}>
          <p>Categories</p>
        </div>
        <CategoryList />
      </div>
    </section>
  );
};

export default Category;
