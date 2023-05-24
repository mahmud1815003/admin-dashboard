import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API,
  }),
  tagTypes: [
    "User",
    "Admins",
    "Sales",
    "Products",
    "Geography",
    "Customers",
    "Transactions",
    "Affiliate",
    "Dashboard",
  ],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => {
        return `general/user/${id}`;
      },
      providesTags: ["User"],
    }),
    getProducts: builder.query({
      query: () => {
        return "client/products";
      },
      providesTags: ["Products"],
    }),
    getCustomer: builder.query({
      query: () => "/client/customers",
      providesTags: ["Customers"],
    }),
    getTransaction: builder.query({
      query: ({ page, pageSize, sort, search }) => {
        return {
          url: "/client/transactions",
          method: "GET",
          params: { page, pageSize, sort, search },
        };
      },
      providesTags: ["Transactions"],
    }),
    getGeography: builder.query({
      query: () => {
        return "/client/geography";
      },
      providesTags: ["Geography"],
    }),
    getSales: builder.query({
      query: () => {
        return "/sales/sales";
      },
      providesTags: ["Sales"],
    }),
    getAdmins: builder.query({
      query: () => "/management/admins",
      providesTags: ["Admins"],
    }),
    getAffiliateStat: builder.query({
      query: ({ userId }) => {
        return `/management/performance/${userId}`;
      },
      providesTags: ["Affiliate"],
    }),
    getDashboard: builder.query({
      query: () => {
        return "/general/dashboard";
      },
      providesTags: ["Dashboard"],
    }),
  }),
});

export default api;
export const {
  useGetUserQuery,
  useGetAdminsQuery,
  useGetSalesQuery,
  useGetDashboardQuery,
  useGetGeographyQuery,
  useGetTransactionQuery,
  useGetProductsQuery,
  useGetCustomerQuery,
  useGetAffiliateStatQuery,
} = api;
