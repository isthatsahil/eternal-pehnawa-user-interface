import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { closeSnackbar } from "../../redux/services/snackbarSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state: any) => state.snackbar
  );

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    // if (reason === 'clickaway') {
    //   return;
    // }
    dispatch(closeSnackbar());
  };

  const vertical = "top";
  const horizontal = "center";

  return (
    <Stack spacing={2} sx={{ width: "100%"}}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomSnackbar;
