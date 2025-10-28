import { mainApi } from "../../app/mainApi.js";
import { getToken } from "../../utils/getToken.js";


const orderApi = mainApi.injectEndpoints({

  endpoints: (builder) => ({

    getOrders: builder.query({
      query: () => ({
        url: '/orders',
        headers: {
          Authorization: getToken()
        },
        method: 'GET'
      }),
      providesTags: ['Orders']
    }),

    getOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'GET'
      }),
      providesTags: ['Orders']
    }),

    createOrder: builder.mutation({
      query: (q) => ({
        url: '/orders',
        body: q,
        headers: {
          Authorization: getToken()
        },
        method: 'POST'
      }),
      invalidatesTags: ['Orders']
    }),
  })
});

export const { useCreateOrderMutation, useGetOrderQuery, useGetOrdersQuery } = orderApi;