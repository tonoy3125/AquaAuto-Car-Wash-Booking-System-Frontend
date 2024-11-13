import { baseApi } from "../../api/baseApi";
import { TResponseRedux, TServiceData } from "@/types";

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
    getAllServices: builder.query({
      query: (args) => {
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
          url: "/services",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TServiceData[]>) => {
        // console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Service"],
    }),
    getSingleServiceById: builder.query({
      query: (id: string) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "ServiceById", id }],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServicesQuery,
  useGetSingleServiceByIdQuery,
} = ServiceApi;
