import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  TextField,
  Button,
  Divider,
  Avatar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
const usestyles = makeStyles((theme) => ({
  profile: {
    borderRadius: "1rem",
    padding: "1.6rem",
    "& >div": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    "& > div > div ": {
      width: "144px",
      height: "144px",
    },
  },
  textfield: {
    width: "100%",
    margin: "1rem 0rem",
    "& > div": {
      borderRadius: "1rem",
    },
  },
  profileDataContainer: {
    borderRadius: "1rem",
    "&>h6": {
      margin: "1.5rem 1rem 0.5rem",
    },
    "&>div": {
      padding: "1rem",
    },
  },
  saveBtn: {
    margin: "0rem 0rem 0.7rem",
    borderRadius: "1rem",
  },
  saveBtnContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

const General = ({ user }) => {
  const classes = usestyles();
  return (
    <Grid container spacing={3}>
      <Grid item sm={12} md={4}>
        <Card className={classes.profile} elevation={0} variant="outlined">
          <CardContent>
            <Avatar
              alt={`${user?.firstname}${user?.lastname}`}
              src={user?.picture}
              sx={{ width: 96, height: 96 }}
            />

            <Typography variant="h6">{user?.name}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={12} md={8}>
        <Paper
          elevation={0}
          variant="outlined"
          className={classes.profileDataContainer}
        >
          <Typography variant="h6">Profile</Typography>
          <Divider />
          <Grid container spacing={3}>
            <Grid item sm={12} md={6}>
              <TextField
                className={classes.textfield}
                label="Name"
                type="text"
                name="name"
                variant="outlined"
                defaultValue={user?.name}
                disabled={user?.name}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <TextField
                className={classes.textfield}
                label="Email Address"
                type="email"
                name="email"
                variant="outlined"
                defaultValue={user?.email}
                disabled={user?.email}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <TextField
                className={classes.textfield}
                label="Phone number"
                type="number"
                name="phoneNumber"
                variant="outlined"
                defaultValue={user?.phoneNumber}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <TextField
                className={classes.textfield}
                label="Country"
                type="text"
                name="country"
                variant="outlined"
                defaultValue={user?.country}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <TextField
                className={classes.textfield}
                label="State/Region"
                type="text"
                name="stateRegion"
                variant="outlined"
                defaultValue={user?.stateRegion}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <TextField
                className={classes.textfield}
                label="City"
                type="text"
                name="city"
                variant="outlined"
                defaultValue={user?.city}
              />
            </Grid>
          </Grid>
          <Divider />
          <Grid item xs={12} className={classes.saveBtnContainer}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.saveBtn}
            >
              Save Changes
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default General;
