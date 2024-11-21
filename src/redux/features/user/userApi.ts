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
  useUpdateUserMutation,
  useRemoveUserMutation,
} = UserApi;
