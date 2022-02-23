import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  COMMERCE_JS_BASE_URL,
  COMMERCE_JS_SECRET_HEADER,
} from "../../lib/constants";

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
          headers: COMMERCE_JS_SECRET_HEADER,
          body: data,
        };
      },
    }),
    getAllCustomers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/customers`,
          headers: COMMERCE_JS_SECRET_HEADER,
        };
      },
    }),
    createCustomerNote: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: `/customers/${data.id}/notes`,
          headers: COMMERCE_JS_SECRET_HEADER,
          body: data.content,
        };
      },
    }),
    getCustomerNotes: builder.query({
      query: (data) => {
        return {
          method: "GET",
          url: `/customers/${data.id}/notes`,
          headers: COMMERCE_JS_SECRET_HEADER,
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
