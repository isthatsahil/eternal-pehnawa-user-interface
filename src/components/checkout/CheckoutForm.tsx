import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { commerce } from "../../lib/commerce";
import { makeStyles } from "@mui/styles";
import FormInformation from "./FormInformation";
import FormShipping from "./FormShipping";
import FormPayment from "./FormPayment";
import Confirmation from "./Confirmation";
import { useCreateCustomerNoteMutation } from "../../redux/services/customers";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme: any) => ({
  container: {
    margin: "0 auto 0 auto",
  },
  stepper: {
    marginBottom: "3rem",
  },
}));

const steps = ["Information", "Payment"];

const CheckoutForm = ({
  checkoutToken,
  setTaxZone,
  getShippingMethod,
  handleIsCheckoutSuccess,
}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [customerShippingData, setCustomerShippingData] = useState({});
  const [createNote, { data: noteResponse }] = useCreateCustomerNoteMutation({
    fixedCacheKey: "createNote",
  });
  const customerId = useSelector((state: any) => state.user.customerId);
  const Form = () =>
    activeStep === 0 ? (
      <FormInformation checkoutToken={checkoutToken} next={next} />
    ) : (
      <FormPayment
        backStep={backStep}
        customerShippingData={customerShippingData}
        nextStep={nextStep}
      />
    );

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const saveCustomerShippingData = async (withAddress, withoutAddress) => {
    await createNote({
      id: customerId,
      content: { content: JSON.stringify(withAddress) },
    });
    await createNote({
      id: customerId,
      content: { content: JSON.stringify(withoutAddress) },
    });
  };
  const next = (data) => {
    const newData = { ...data };
    const withAddress = {
      address: newData.address,
      phone: newData.phone,
      email: newData.email,
      firstName: newData.firstName,
      lastName: newData.lastName,
    };
    const asArray = Object.entries(newData);
    const withoutAddr = asArray.filter(([key, value]) => {
      return (
        key !== "address" &&
        key !== "firstName" &&
        key !== "lastName" &&
        key !== "email" &&
        key !== "phone"
      );
    });
    const withoutAddress = Object.fromEntries(withoutAddr);
    console.log("withoutAddress", withoutAddress);
    if (data?.isSaveAddress) {
      saveCustomerShippingData(withAddress, withoutAddress);
    }
    getShippingMethod(
      checkoutToken?.id,
      data?.shippingOption,
      data?.shippingCountry,
      data?.shippingRegion
    );
    setCustomerShippingData(data);
    nextStep();
  };

  return (
    <Box className={classes.container}>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length
        ? handleIsCheckoutSuccess(true)
        : checkoutToken && <Form />}
    </Box>
  );
};

export default CheckoutForm;
