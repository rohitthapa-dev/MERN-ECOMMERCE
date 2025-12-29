import { mainApi } from "../../app/mainApi.js";

export const productApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopProducts: builder.query({
      query: () => ({
        url: "/top-5-products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    getProducts: builder.query({
      query: ({ search = "", page = 1, sort = "", limit = 8 } = {}) => ({
        url: "/products",
        params: { search, page, sort, limit },
        method: "GET",
      }),
    }),

    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    addProduct: builder.mutation({
      query: ({ formData, token }) => ({
        url: `/products`,
        body: formData,
        headers: {
          Authorization: token,
        },
        method: "POST",
      }),
      invalidatesTags: ["Products", "ID"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, formData, token }) => ({
        url: `/products/${id}`,
        body: formData,
        headers: {
          Authorization: token,
        },
        method: "PATCH",
      }),
      invalidatesTags: ["Products", "ID"],
    }),

    removeProduct: builder.mutation({
      query: ({ id, token }) => ({
        url: `/products/${id}`,
        headers: {
          Authorization: token,
        },
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    reviewProduct: builder.mutation({
      query: (q) => ({
        url: `/products/reviews/${q.id}`,
        body: q.data,
        headers: {
          Authorization: q.token,
        },
        method: "POST",
      }),
      invalidatesTags: ["Products", "id"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useRemoveProductMutation,
  useGetTopProductsQuery,
  useReviewProductMutation,
} = productApi;
