import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  useRefundOrderMutation,
  useCustOrdersQuery,
} from "../../redux/services/custDetails";
import { showSnackbar } from "../../redux/services/snackbarSlice";
import { useDispatch } from "react-redux";

export default function RefundPrompt({ orderId, setRefundTracker }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const [refundOrder, { data }] = useRefundOrderMutation({
    fixedCacheKey: "refund",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  //   if (refundSuccess) {
  //     const { data, isLoading, error } = useCustOrdersQuery(user.id);
  //   }
  const handleClose = () => {
    refundOrder(orderId)
      .then(() => {
        setRefundTracker(true);
        dispatch(
          showSnackbar({
            message: "Order refunded successfully",
            severity: "success",
          })
        );
      })
      .catch((err) => {
        dispatch(
          showSnackbar({
            message: "Error refunding order",
            severity: "error",
          })
        );
      });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Refund
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Caution</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel and refund your order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
