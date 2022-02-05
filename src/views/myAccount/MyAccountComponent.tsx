import React from "react";
import { useSelector } from "react-redux";
import { useCustAccountQuery } from "../../redux/services/custDetails";

const MyAccountComponent = () => {
  const custId = useSelector((state: any) => state.user.customerId);
  console.log("custId", custId);
  const { loading, data, error } = useCustAccountQuery(custId);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default MyAccountComponent;
