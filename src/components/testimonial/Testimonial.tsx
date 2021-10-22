import { makeStyles } from "@mui/styles";
import Slider from "./Slider";
import weaver from "../../assets/weaver.jpg";

const useStyles = makeStyles(
  (theme: { breakpoints: { down: (arg0: string) => any } }) => ({
    testimonialContainer: {
      background: "#e0c387 !important",
      height: "auto",
      marginBottom: "4rem",
    },
    wrapper: {
      display: "grid",
      gridTemplateColumns: "repeat(5,1fr)",
      width: "90vw",
      margin: "0 auto",
      padding: "4rem 0",
    },
    left: {
      background: `url(${weaver}) center center`,
      backgroundSize: "cover",
      height: "600px",
      gridRow: "1/2",
      gridColumn: "1/3",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    right: {
      alignSelf: "center",
      gridRow: "1/2",
      gridColumn: "2/6",
      zIndex: 2,
      background: "#f1f1f1",
      height: "400px",
      [theme.breakpoints.down("md")]: {
        gridColumn: "1/6",
      },
    },
  })
);

const reviews = [
  {
    text: "Mom received the saree and she loved it.A great big thanks to the artisan who did a fabulous job !!!Please do convey my heartfelt thanks to the weaver.",
    author: "Surbi Sandilayal",
  },
  {
    text: "Hi...Happppeeee to receive the materials and the ajrakh are simply awesome.Thank you",
    author: "Anamika",
  },
  {
    text: "The prompt response and shipping of the product is impressive.megha is quick to repond to any quries and provides amazing customer support.Needless to say, the products are stunning!",
    author: "Ayush Jain",
  },
];
const Testimonial = () => {
  const classes = useStyles();
  return (
    <section className={classes.testimonialContainer}>
      <div className={classes.wrapper}>
        <div className={classes.left}></div>
        <div className={classes.right}>
          <Slider reviews={reviews} />
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
