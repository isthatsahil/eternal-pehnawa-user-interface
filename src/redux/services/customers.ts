import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { COMMERCE_JS_BASE_URL } from "../../lib/constants";

export const CUSTOMER_HEADER = {
  "X-Authorization": "sk_test_360704e550bcf2b26bfddea1f6b0079873a0de63b96dc",
  "Content-Type": "application/json",
  Accept: "application/json",
};
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
          headers: CUSTOMER_HEADER,
          body: data,
        };
      },
    }),
    getAllCustomers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/customers`,
          headers: CUSTOMER_HEADER,
        };
      },
    }),
    createCustomerNote: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: `/customers/${data.id}/notes`,
          headers: CUSTOMER_HEADER,
          body: data.content,
        };
      },
    }),
    getCustomerNotes: builder.query({
      query: (data) => {
        return {
          method: "GET",
          url: `/customers/${data.id}/notes`,
          headers: CUSTOMER_HEADER,
        };
      },
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useGetAllCustomersQuery,
  useCreateCustomerNoteMutation,
  useGetCustomerNotesQuery,
} = customerApi;
export default customerApi;
