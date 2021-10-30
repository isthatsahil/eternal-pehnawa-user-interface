import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  (theme: { breakpoints: { down: (arg0: string) => any } }) => ({
    skeleton: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridGap: "1rem",
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "repeat(auto-fit,minmax(337px,1fr))",
      },
    },
  })
);
const ProductSkeleton = () => {
  const classes = useStyles();
  const dummyData = [1, 2, 3];
  return (
    <div className={classes.skeleton}>
      {dummyData.map((data) => {
        return (
          <Stack key={data}>
            <Skeleton variant="rectangular" width="100%" height={168} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Skeleton variant="text" width={80} height={20} />
              <Skeleton variant="text" width={80} height={20} />
            </div>
          </Stack>
        );
      })}
    </div>
  );
};

export default ProductSkeleton;
