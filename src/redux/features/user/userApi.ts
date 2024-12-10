import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { TUserData } from "@/types/userData.type";

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ token, ...args }) => {
        const params = new URLSearchParams();

        // Loop through args and append them to params
        Object.keys(args).forEach((key) => {
          if (Array.isArray(args[key])) {
            // Handle array for multiple values, if necessary (e.g., for statuses)
            args[key].forEach((value: string) => {
              params.append(key, value);
            });
          } else if (args[key]) {
            // Append normal key-value pairs
            params.append(key, args[key]);
          }
        });

        return {
          url: "/users",
          method: "GET",
          params: params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      transformResponse: (response: TResponseRedux<TUserData[]>) => {
        // console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Auth"],
    }),
    getUserById: builder.query({
      query: ({ id, token }) => ({
        url: `/users/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Auth"],
    }),
    updateUser: builder.mutation({
      query: ({ token, id, role }) => ({
        url: `/users/role/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { role },
      }),
      invalidatesTags: ["Auth"],
    }),
    updateUserById: builder.mutation({
      query: ({ token, id, userInfo }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: userInfo,
      }),
      invalidatesTags: ["Auth"],
    }),
    removeUser: builder.mutation({
      query: ({ token, id }) => ({
        url: `/users/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useUpdateUserByIdMutation,
  useRemoveUserMutation,
} = UserApi;
