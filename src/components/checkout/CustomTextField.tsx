import React from "react";
import { TextField, Grid } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const CustomTextField = (props: any) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Grid item xs={12} sm={props.sameRow}>
      <Controller
        name={props.name}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth={props.fullWidth}
            label={props.label}
            error={!!errors[props.name]}
            helperText={errors[props.name]?.message}
          />
        )}
        defaultValue=""
        control={control}
      />
    </Grid>
  );
};

export default CustomTextField;
