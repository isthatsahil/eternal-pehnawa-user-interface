import ProfileDropdown from "./ProfileDropdown";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetAllCustomersQuery } from "../../redux/services/customers";
import UserDataEntry from "./UserDataEntry";
import { useEffect, useState } from "react";
import { useCreateCustomerMutation } from "../../redux/services/customers";
import { setCustomerId } from "../../redux/services/user.js";
import { useDispatch } from "react-redux";

const NavbarLogin = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [openUserEntryPopup, setUserEntryPopup] = useState(false);
  const [userData, setUserData] = useState(null);
  const { data: allCustomers, error, isLoading } = useGetAllCustomersQuery("");
  const [createCustomer, { data: customerInfo }] = useCreateCustomerMutation({
    fixedCacheKey: "myCacheKey",
  });
  const handleClick = () => {
    loginWithRedirect({ screen_hint: "signin" });
  };

  //function returns customer data if already exist else returns undefined
  const checkCutomerAlreadyExist = (externalId: string) => {
    return allCustomers?.data?.find(
      (customer: any) => customer.external_id === externalId
    );
  };

  useEffect(() => {
    if (user && allCustomers?.data) {
      const externalId = user.sub.split("|")[1];
      const currentCustomer = checkCutomerAlreadyExist(externalId);
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

  if (customerInfo?.id) {
    dispatch(setCustomerId(customerInfo?.id));
  }
  return (
    <div>
      {isAuthenticated ? (
        <ProfileDropdown user={user} />
      ) : (
        <Button size="small" sx={{ color: "#191919" }} onClick={handleClick}>
          Login
        </Button>
      )}
      {open && userData ? (
        <UserDataEntry
          open={openUserEntryPopup}
          setOpen={setUserEntryPopup}
          userData={userData}
        />
      ) : null}
    </div>
  );
};

export default NavbarLogin;
