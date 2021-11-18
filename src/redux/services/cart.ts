import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { COMMERCE_JS_BASE_URL, COMMERCE_JS_HEADER } from "../../lib/constants";

const createRequest = (url: string) => ({ url, headers: COMMERCE_JS_HEADER });

const cartApi = createApi({
  reducerPath: "cart",
  baseQuery: fetchBaseQuery({
    baseUrl: COMMERCE_JS_BASE_URL,
  }),
  endpoints: (builder) => ({
    getCart: builder.query({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: (arg) => createRequest("/carts"),
    }),
    retrieveCart: builder.query({
      query: (data) => {
        return {
          method: "GET",
          url: `/carts/${data.cartId}`,
          headers: COMMERCE_JS_HEADER,
        };
      },
    }),
    addToCart: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: `/carts/${data.cartId}`,
          headers: COMMERCE_JS_HEADER,
          body: {
            id: data.productId,
            quantity: data.quantity,
            options: data.options,
          },
        };
      },
    }),
    updateCartOnDiscount: builder.query({
      query: (data) => {
        return {
          method: "PUT",
          url: `/carts/${data.cartId}`,
          headers: COMMERCE_JS_HEADER,
          params: {
            discount_code: data.discountCode,
          },
        };
      },
    }),
    updateCartOnItem: builder.query({
      query: (data) => {
        return {
          method: "PUT",
          url: `/carts/${data.cartId}/items/${data.lineItemId}/`,
          headers: COMMERCE_JS_HEADER,
          params: {
            quantity: data.quantity,
          },
        };
      },
    }),
    emptyCart: builder.query({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/carts/${data.cartId}/items`,
          headers: COMMERCE_JS_HEADER,
        };
      },
    }),
    removeItemFromCart: builder.query({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/carts/${data.cartId}/items/${data.lineItemId}`,
          headers: COMMERCE_JS_HEADER,
        };
      },
    }),
    deleteCart: builder.query({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/carts/${data.cartId}`,
          headers: COMMERCE_JS_HEADER,
        };
      },
    }),
  }),
});

export const {
  useGetCartQuery,
  useRetrieveCartQuery,
  useAddToCartMutation,
  useUpdateCartOnDiscountQuery,
  useUpdateCartOnItemQuery,
  useEmptyCartQuery,
  useRemoveItemFromCartQuery,
  useDeleteCartQuery,
} = cartApi;
export default cartApi;
