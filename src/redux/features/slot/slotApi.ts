import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { TSlotData } from "@/types/slotData.type";

const SlotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlot: builder.mutation({
      query: ({ token, slotData }) => ({
        url: "/services/slots",
        method: "POST",
        body: slotData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Slot"],
    }),
    getAllSlot: builder.query({
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
          url: "/slots/availability",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TSlotData[]>) => {
        console.log("inside redux", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Slot"],
    }),
    updateIsBooked: builder.mutation({
      query: ({ token, id, isBooked }) => ({
        url: `/services/slots/isBooked/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { isBooked },
      }),
      invalidatesTags: ["Slot"],
    }),
    removeSlot: builder.mutation({
      query: ({ token, id }) => ({
        url: `/services/slots/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Slot"],
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useGetAllSlotQuery,
  useUpdateIsBookedMutation,
  useRemoveSlotMutation,
} = SlotApi;
