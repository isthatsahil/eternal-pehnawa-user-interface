import { useRef, useEffect } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  appCursor: {
    zIndex: 1000,
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    border: "1px solid #191919",
    overflow: "hidden",
    pointerEvents: "none",
    transform: "translate3d(0,0,0)",
    position: "fixed",
  },
});
const CustomCursor = () => {
  const classes = useStyles();
  const cursorRef = useRef(null);
  useEffect(() => {
    document.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;
      const mouseX = clientX - cursorRef.current.clientWidth / 2;
      const mouseY = clientY - cursorRef.current.clientWidth / 2;
      cursorRef.current.style.transform = `translate3d(${mouseX}px,${mouseY}px,0)`;
    });
  }, []);
  return <div className={classes.appCursor} ref={cursorRef}></div>;
};

export default CustomCursor;
