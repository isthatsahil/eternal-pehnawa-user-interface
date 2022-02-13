import React from "react";
import { useSelector } from "react-redux";
import { useCustAccountQuery } from "../../redux/services/custDetails";
import Account from "./Account.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "@components/navbar/Navbar";
const MyAccountComponent = () => {
  const custId = useSelector((state: any) => state.user.customerId);
  console.log("custId", custId);
  const { isLoading, data: cust, error } = useCustAccountQuery(custId);
  const { user: authUser, isAuthenticated, loginWithRedirect } = useAuth0();
  let user = null;
  if (!isLoading && authUser) {
    const pictData = {
      picture: authUser.picture,
    };
    user = { ...cust, ...pictData };
  }
  return (
    !isLoading && (
      <>
        <Navbar />
        <Account user={user} />
      </>
    )
  );
};

export default MyAccountComponent;
