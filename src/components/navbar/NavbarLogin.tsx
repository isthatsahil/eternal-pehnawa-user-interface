import ProfileDropdown from "./ProfileDropdown";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetAllCustomersQuery } from "../../redux/services/customers";
import UserDataEntry from "./UserDataEntry";
import { useEffect, useState } from "react";

const NavbarLogin = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [openUserEntryPopup, setUserEntryPopup] = useState(false);
  const [userData, setUserData] = useState(null);

  const { data, error, isLoading } = useGetAllCustomersQuery("");

  console.log({ user });
  const handleClick = () => {
    loginWithRedirect({ screen_hint: "signin" });
  };

  //function returns customer data if already exist else returns undefined
  const checkCutomerAlreadyExist = (externalId: string) => {
    return data?.data?.find(
      (customer: any) => customer.external_id === externalId
    );
  };

  useEffect(() => {
    if (user && data) {
      const externalId = user.sub.split("|")[1];
      const customer = checkCutomerAlreadyExist(externalId);
      if (!customer) {
        const loginType = user.sub.split("|")[0];
        if (loginType === "sms") {
          setUserData({ phone: user.name, external_id: externalId });
        } else {
          setUserData({
            firstname: user.given_name,
            lastname: user.family_name,
            email: user.email,
            external_id: externalId,
          });
        }
        setUserEntryPopup(true);
      }
    }
  }, [user, data]);

  console.log({ userData });

  return (
    <div>
      {isAuthenticated ? (
        <ProfileDropdown />
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
