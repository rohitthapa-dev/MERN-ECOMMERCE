
import { mainApi } from "../../app/mainApi.js";





export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    loginUser: builder.mutation({
      query: (data) => ({
        url: '/users/login',
        body: data,
        method: 'POST'
      })

    }),

    registerUser: builder.mutation({
      query: (data) => ({
        url: '/users/register',
        body: data,
        method: 'POST'
      })

    }),

    updateUser: builder.mutation({
      query: (q) => ({
        url: `/users`,
        body: q.data,
        headers: {
          Authorization: q.token
        },
        method: 'PATCH'
      }),
      invalidatesTags: ['Users']
    }),

    getUser: builder.query({
      query: (token) => ({
        url: `/users`,
        headers: {
          Authorization: token
        },
        method: 'get'
      }),
      providesTags: ['Users']
    })




  })



});

export const { useLoginUserMutation, useRegisterUserMutation, useGetUserQuery, useUpdateUserMutation } = authApi;




