import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { useCreateCustomerMutation } from "../../redux/services/customers";

const useStyles = makeStyles(() => ({
  container: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#ffff",
    padding: "3rem 3rem 2rem 3rem",
    "& .MuiTextField-root": {
      marginBottom: "1rem",
    },
    borderRadius: "1rem",
    outline: "none"
  },
  btnsContainer: {
    display: "flex",
    justifyContent: "center",
    "& > button:nth-child(1)": {
      marginRight: "1rem",
    },
  },
}));

const UserDataEntry = ({
  open,
  setOpen,
  userData,
}: {
  open: boolean;
  setOpen: any;
  userData: any;
}) => {
  const classes = useStyles();
  const [data, setData] = useState(userData);
  const handleOpen = () => setOpen(true);
  const handleClose = (event: any, reason: string) => {
    if (reason === "backdropClick") {
      return;
    }
    setOpen(false);
  };

  const [createCustomer] = useCreateCustomerMutation();
  const handleSubmit = () => {
    createCustomer(data);
    handleClose("", "");
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  console.log({ data });
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.container}>
          <TextField
            label="First name"
            name="firstname"
            value={data.firstname}
            onChange={handleInputChange}
          />
          <TextField
            label="Last name"
            name="lastname"
            value={data.lastname}
            onChange={handleInputChange}
          />
          <TextField
            label="Email"
            name="email"
            value={data.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Phone number"
            name="phone"
            value={data.phone}
            onChange={handleInputChange}
          />
          <div className={classes.btnsContainer}>
            <Button variant="contained" color="inherit" onClick={handleSubmit}>
              Skip
            </Button>
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UserDataEntry;
