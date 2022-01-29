import { makeStyles } from "@mui/styles";
import CategoryList from "./CategoryList";

const useStyles = makeStyles({
  categoryContainer: {
    backgroundColor: "#f1f5f8 !important",
    height: "auto",
  },
  wrapper: {
    width: "90vw",
    margin: "0 auto",
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
  const classes = useStyles();
  return (
    <>
      <section id="category" className={classes.categoryContainer}>
        <div className={classes.wrapper}>
          <div className={classes.categoryTitle}>
            <p>Categories</p>
          </div>
          <CategoryList />
        </div>
      </section>
    </>
  );
};

export default Category;
