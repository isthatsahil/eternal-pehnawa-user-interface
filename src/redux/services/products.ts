import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { COMMERCE_JS_BASE_URL, COMMERCE_JS_HEADER } from "../../lib/constants";

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
    getAllCategories: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/categories`,
          headers: COMMERCE_JS_HEADER,
        };
      },
    }),
    getEachCategory: builder.mutation({
      query: (id) => {
        return {
          method: "GET",
          url: `/categories/${id}`,
          headers: COMMERCE_JS_HEADER,
        };
      },
    }),
    getProductCategory: builder.query({
      query: (slug) =>
        createRequest(`/products?limit=200&category_slug=${slug}`),
    }),
    getProduct: builder.query({
      query: (id) => createRequest(`/products?query=${id}`),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetAllCategoriesQuery,
  useGetEachCategoryMutation,
  useGetProductCategoryQuery,
  useGetProductQuery,
} = productApi;
export default productApi;
