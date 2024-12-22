import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { TReviewData } from "@/types/reviewData.type";

const ReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: ({ token, reviewData }) => ({
        url: "/review",
        method: "POST",
        body: reviewData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Review"],
    }),
    getAllReviews: builder.query({
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
          url: "/review",
          method: "GET",
          params: params,
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        };
      },
      transformResponse: (response: TResponseRedux<TReviewData[]>) => {
        // console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Review"],
    }),
  }),
});

export const { useCreateReviewMutation, useGetAllReviewsQuery } = ReviewApi;
