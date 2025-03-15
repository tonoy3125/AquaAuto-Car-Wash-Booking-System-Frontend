import { baseApi } from "../../api/baseApi";

const StatisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecentStatistics: builder.query({
      query: (token) => ({
        url: "/statistics/recent",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Statistics"],
    }),
  }),
});

export const { useGetRecentStatisticsQuery } = StatisticsApi;
