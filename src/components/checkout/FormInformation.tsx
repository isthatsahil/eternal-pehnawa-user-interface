import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useForm, FormProvider } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import { commerce } from "../../lib/commerce";
import { makeStyles } from "@mui/styles";
import { NavLink } from "react-router-dom";
import { formValidationRules } from "./FormValidationRules";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetAllCustomersQuery } from "../../redux/services/customers";
import {
  useCreateCustomerMutation,
  useCreateCustomerNoteMutation,
} from "../../redux/services/customers";
import { setCustomerId } from "../../redux/services/user.js";
import { useDispatch } from "react-redux";
import {
  COMMERCE_JS_BASE_URL,
  COMMERCE_JS_SECRET_HEADER,
  COMMERCE_JS_HEADER,
} from "../../lib/constants";
import axios from "axios";

const useStyles = makeStyles((theme: any) => ({
  btnGrpContainer: {
    display: "flex",
    margin: "1rem 0rem",
  },
  logLink: {
    textDecoration: "none",
  },
}));
const FormInformation = ({ checkoutToken, next }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const { data: allCustomers, error, isLoading } = useGetAllCustomersQuery("");
  const [localCustomerId, setLocalCustomerId] = useState("");
  const [customerDefaultShipping, setCustomerDefaultShipping] = useState({});
  const [createCustomer, { data: customerInfo }] = useCreateCustomerMutation({
    fixedCacheKey: "myCacheKey",
  });

  const [createNote, { data: customerNotes }] = useCreateCustomerNoteMutation({
    fixedCacheKey: "createNote",
  });

  useEffect(() => {
    if (localCustomerId) {
      const getCustomerNotes = async () => {
        const url = `${COMMERCE_JS_BASE_URL}/customers/${localCustomerId}/notes`;
        const { data } = await axios.get(url, {
          headers: COMMERCE_JS_SECRET_HEADER,
        });
        console.log(data?.data?.[0]?.content);
        console.log(data?.data?.[1]?.content);
        const finalObject = data?.data?.[0]?.content
          .replace("}", ",")
          .concat(data?.data?.[1]?.content.replace("{", ""));

        console.log("first note", finalObject);
        const notesData = JSON.parse(finalObject);
        console.log("notes", notesData);
        setCustomerDefaultShipping(notesData);
        methods.setValue("email", notesData.email);
        methods.setValue("firstName", notesData.firstName);
        methods.setValue("lastName", notesData.lastName);
        methods.setValue("address", notesData?.address);
        methods.setValue("city", notesData?.city);
        methods.setValue("pincode", notesData?.pincode);
        methods.setValue("phone", notesData?.phone);
      };
      getCustomerNotes();
    }
  }, [localCustomerId]);

  //function returns customer data if already exist else returns undefined
  const checkCutomerAlreadyExist = (externalId: string) => {
    return allCustomers?.data?.find(
      (customer: any) => customer.external_id === externalId
    );
  };

  //const { data: customerNotes } = useGetCustomerNotesQuery(localCustomerId);
  // console.log("customer notes", customerNotes, localCustomerId);
  useEffect(() => {
    if (user && allCustomers?.data) {
      const externalId = user.sub.split("|")[1];
      const currentCustomer = checkCutomerAlreadyExist(externalId);
      setLocalCustomerId(currentCustomer?.id);
      if (!currentCustomer) {
        const loginType = user.sub.split("|")[0];
        if (loginType === "sms") {
          createCustomer({ phone: user.name, external_id: externalId });
        } else {
          createCustomer({
            firstname: user.given_name,
            lastname: user.family_name,
            email: user.email,
            external_id: externalId,
          });
        }
      } else {
        dispatch(setCustomerId(currentCustomer.id));
      }
    }
  }, [user, allCustomers]);

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const [isSaveAddress, setIsSaveAddress] = useState(false);
  const methods = useForm(formValidationRules);

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchShippingSubDivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      {
        country,
        region,
      }
    );

    setShippingOptions(options);
    setShippingOption(options[0]?.id);
  };
  useEffect(() => {
    fetchShippingCountries(checkoutToken?.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchShippingSubDivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingCountry)
      fetchShippingOptions(
        checkoutToken?.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingCountry]);

  const handleSaveAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
    }
  };

  const handleCustomerlogin = () => {
    if (!isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: "/checkout" },
      });
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ marginBottom: "0rem !important" }}
        >
          Contact Information
        </Typography>
        <p style={{ fontSize: "14px" }}>
          {!isAuthenticated ? (
            <>
              Already have an account?{" "}
              <Button className={classes.logLink} onClick={handleCustomerlogin}>
                log in
              </Button>
            </>
          ) : (
            ""
          )}
        </p>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
              isSaveAddress,
            })
          )}
        >
          <Grid container spacing={3}>
            <CustomTextField
              name="email"
              label="Email"
              required={true}
              fullWidth={true}
              sameRow={12}
            />
            <Grid item xs={12} sm={12} sx={{ marginTop: "1rem" }}>
              <Typography variant="subtitle1" gutterBottom>
                Shipping Address
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel>Country/Region</InputLabel>
                <Select
                  value={shippingCountry}
                  label="Country/Region"
                  required
                  onChange={(e) => setShippingCountry(e.target.value)}
                  defaultValue={
                    customerDefaultShipping?.shippingCountry || shippingCountry
                  }
                >
                  {Object.entries(shippingCountries)
                    .map(([key, value]) => ({
                      id: key,
                      label: value,
                    }))
                    .map((country) => (
                      <MenuItem key={country.id} value={country.id}>
                        {country.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <CustomTextField
              name="firstName"
              label="First Name"
              required={true}
              fullWidth={true}
              sameRow={6}
            />
            <CustomTextField
              name="lastName"
              label="Last Name"
              required={true}
              fullWidth={true}
              sameRow={6}
            />
            <CustomTextField
              name="address"
              label="Address"
              required={true}
              fullWidth={true}
              sameRow={12}
            />
            <CustomTextField
              name="city"
              label="City"
              required={true}
              fullWidth={true}
              sameRow={4}
            />
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>State/Providence</InputLabel>
                <Select
                  value={
                    customerDefaultShipping?.shippingSubdivision ||
                    shippingSubdivision
                  }
                  label="State/Providence"
                  onChange={(e) => setShippingSubdivision(e.target.value)}
                >
                  {Object.entries(shippingSubdivisions)
                    .map(([key, value]) => ({
                      id: key,
                      label: value,
                    }))
                    .map((country) => (
                      <MenuItem key={country.id} value={country.id}>
                        {country.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <CustomTextField
              name="pincode"
              label="Pincode"
              required={true}
              fullWidth={true}
              sameRow={4}
            />
            <Grid item xs={12} sm={12}>
              <FormControl>
                <FormLabel id="shipping-radio-buttons-group-label">
                  Shipping Method
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={shippingOption}
                  name="shippingOption"
                >
                  {shippingOptions
                    ?.map((sO) => ({
                      id: sO?.id,
                      label: `${sO?.description} - (${sO?.price?.formatted_with_symbol})`,
                    }))
                    .map((option) => (
                      <FormControlLabel
                        key={option.id}
                        value={option?.id}
                        control={<Radio />}
                        label={option?.label}
                      />
                    ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <CustomTextField
              name="phone"
              label="Phone"
              required={true}
              fullWidth={true}
              sameRow={12}
            />
            {isAuthenticated && (
              <Grid item xs={12} sm={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          setIsSaveAddress((prevState) => !prevState)
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Save this information for next time"
                  />
                </FormGroup>
              </Grid>
            )}
          </Grid>
          <div className={classes.btnGrpContainer}>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                marginRight: "1rem",
                backgroundColor: "black",
                padding: "1.4rem 1.7rem",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
              size="large"
              type="submit"
            >
              Continue to payments
            </Button>
            <Button
              variant="text"
              component={NavLink}
              to="/"
              sx={{ textTransform: "none", color: "black" }}
              size="small"
            >
              Return to cart
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default FormInformation;
