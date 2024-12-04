import { baseApi } from "../../api/baseApi";

const PaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: ({ token, paymentData }) => ({
        url: "/payment/create-intent",
        method: "POST",
        body: paymentData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const { useCreatePaymentMutation } = PaymentApi;
