import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { COMMERCE_JS_BASE_URL, COMMERCE_JS_HEADER } from "../../lib/constants";

const checkoutApi = createApi({
  reducerPath: "checkout",
  baseQuery: fetchBaseQuery({
    baseUrl: COMMERCE_JS_BASE_URL,
  }),
  endpoints: (builder) => ({
    genrateCheckoutToken: builder.mutation({
      query: (cartId) => {
        return {
          method: "GET",
          url: `/checkouts/${cartId}`,
          headers: COMMERCE_JS_HEADER,
          params: {
            type: "cart",
          },
        };
      },
    }),
  }),
});

export const { useGenrateCheckoutTokenMutation } = checkoutApi;
export default checkoutApi;
