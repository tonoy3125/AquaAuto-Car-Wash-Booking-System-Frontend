import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Auth"],
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, ...passwordData }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: passwordData,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
