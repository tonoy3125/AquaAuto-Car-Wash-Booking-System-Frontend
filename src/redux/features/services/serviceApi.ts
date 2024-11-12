import { baseApi } from "../../api/baseApi";

const ServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (serviceInfo) => ({
        url: "/services",
        method: "POST",
        body: serviceInfo,
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const { useCreateServiceMutation } = ServiceApi;
