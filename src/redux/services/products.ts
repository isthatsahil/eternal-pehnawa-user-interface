import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { COMMERCE_JS_BASE_URL, COMMERCE_JS_HEADER } from "lib/constants";

const createRequest = (url: string) => ({ url, headers: COMMERCE_JS_HEADER });

const productApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: COMMERCE_JS_BASE_URL,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (limit) => createRequest(`/products?limit=${limit}`),
    }),
    getProductCategory: builder.query({
      query: (slug) =>
        createRequest(`/products?limit=200&category_slug=${slug}`),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductCategoryQuery } = productApi;
export default productApi;
