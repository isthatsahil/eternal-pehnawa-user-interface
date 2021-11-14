import React from "react";
import { IconButton, Modal, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const useStyles = makeStyles((theme: any) => ({
  modal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItmes: "center",
    outline: "none",
    cursor: "default",
    "&>img": {
      maxWidth: "100%",
      overflow: "hidden",
    },
    [theme.breakpoints.down("sm")]: {
      height: "unset",
      "&>img": {
        border: "1rem solid #ffff",
        borderRadius: "5px",
      },
    },
  },
  imageContainer: {
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    margin: "auto",
    "&>img": {
      maxWidth: "100%",
      maxHeight: "100%",
      overflow: "hidden",
    },
  },
  closeBtn: {
    width: "2rem",
    height: "2rem",
    position: "absolute !important",
    top: "2rem",
    right: "2rem",
    [theme.breakpoints.down("sm")]: {
      top: "1rem",
      right: "1rem",
    },
  },
}));

const ImageZoom = ({ src }: { src: string }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className={classes.imageContainer}>
        <img src={src} alt="product" onClick={handleOpen} />
      </div>
      <Modal open={open} onClose={handleClose}>
        <Paper elevation={3} className={classes.modal}>
          <img src={src} alt="product" />
          <IconButton
            className={classes.closeBtn}
            size="large"
            onClick={handleClose}
            sx={{backgroundColor: "#ffffff87"}}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Paper>
      </Modal>
    </div>
  );
};

export default ImageZoom;
