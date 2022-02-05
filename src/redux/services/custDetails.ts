import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { COMMERCE_JS_BASE_URL, COMMERCE_JS_HEADER } from "../../lib/constants";

const custDetailsApi = createApi({
  reducerPath: "custDetails",
  baseQuery: fetchBaseQuery({
    baseUrl: COMMERCE_JS_BASE_URL,
  }),
  endpoints: (builder) => ({
    custAccount: builder.query({
      query: (custId) => {
        return {
          method: "GET",
          url: `/customers/${custId}`,
          headers: COMMERCE_JS_HEADER,
        };
      },
    }),
  }),
});

export const { useCustAccountQuery } = custDetailsApi;
export default custDetailsApi;
