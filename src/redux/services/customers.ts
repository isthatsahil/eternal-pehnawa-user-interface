import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { COMMERCE_JS_BASE_URL, COMMERCE_JS_HEADER } from "../../lib/constants";

const customerApi = createApi({
  reducerPath: "customers",
  baseQuery: fetchBaseQuery({
    baseUrl: COMMERCE_JS_BASE_URL,
  }),
  endpoints: (builder) => ({
    createCustomer: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: `/customers`,
          headers: COMMERCE_JS_HEADER,
          body: data,
        };
      },
    }),
    getAllCustomers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/customers`,
          headers: COMMERCE_JS_HEADER,
        };
      },
    }),
  }),
});

export const { useCreateCustomerMutation, useGetAllCustomersQuery } =
  customerApi;
export default customerApi;
