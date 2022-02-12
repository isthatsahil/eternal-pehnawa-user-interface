import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last name is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.number()
    .typeError("Entered value must be a number")
    .required("Pincode is required"),
  phone: Yup.number()
    .typeError("Entered value must be a number")
    .required("Phone number is required"),
});

export const formValidationRules = { resolver: yupResolver(validationSchema) };
