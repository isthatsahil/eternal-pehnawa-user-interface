import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commerceHeaders = {
  "X-Authorization": process.env.REACT_APP_CHEC_PUBLIC_KEY,
};
const createRequest = (url: string) => ({ url, headers: commerceHeaders });

const productApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.chec.io/v1",
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
