import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { TBookingData } from "@/types/bookingData.type";

const BookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // createService: builder.mutation({
    //   query: ({ token, formData }) => ({
    //     url: "/services",
    //     method: "POST",
    //     body: formData,
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }),
    //   invalidatesTags: ["Service"],
    // }),
    getAllBookings: builder.query({
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
          url: "/bookings",
          method: "GET",
          params: params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      transformResponse: (response: TResponseRedux<TBookingData[]>) => {
        // console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Booking"],
    }),
    removeBooking: builder.mutation({
      query: ({ token, id }) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const { useGetAllBookingsQuery, useRemoveBookingMutation } = BookingApi;
