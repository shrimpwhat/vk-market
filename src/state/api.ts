import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "./cartSlice";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/products" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "",
      transformResponse: (response: Omit<Product, "count">[]): Product[] =>
        response.map((product) => ({
          ...product,
          count: 1,
        })),
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
