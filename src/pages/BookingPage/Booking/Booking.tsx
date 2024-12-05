import Spinner from "@/components/Spinner/Spinner";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useGetPendingBookingsByUserIdQuery } from "@/redux/features/bookings/bookingsApi";
import { useCreatePaymentMutation } from "@/redux/features/payment/paymentApi";
import { useAppSelector } from "@/redux/hooks";
import { TUserPayload } from "@/types";
import {
  TServiceBookingData,
  TSlotBookingData,
} from "@/types/bookingData.type";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { toast } from "sonner";

const Booking = () => {
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null; // Get current user's ID
  const userId = user?.id as string;
  const token = useAppSelector(useCurrentToken);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    startTime: string;
    endTime: string;
  } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: userPendingBookings, isLoading } =
    useGetPendingBookingsByUserIdQuery(userId!);
  //   console.log(userBookings);

  const [createPayment] = useCreatePaymentMutation();

  // Filter to get unique services
  const uniqueServices = userPendingBookings?.data?.reduce(
    (acc: any, booking: TServiceBookingData) => {
      const serviceName = booking?.service?.name;
      if (
        serviceName &&
        !acc.some((item: any) => item?.service?.name === serviceName)
      ) {
        acc.push(booking);
      }
      return acc;
    },
    [] as (typeof userPendingBookings)["data"]
  );

  // Automatically set the first service as active on load
  useEffect(() => {
    if (uniqueServices?.length && !selectedService) {
      setSelectedService(uniqueServices[0]?.service?.name || null);
    }
  }, [uniqueServices, selectedService]);

  const selectedServiceSlots = userPendingBookings?.data?.filter(
    (booking: any) => booking?.service?.name === selectedService
  );
  // console.log(selectedServiceSlots);

  const calculateTotalServicePrice = () => {
    if (!userPendingBookings?.data?.length) return 0;

    return userPendingBookings.data.reduce((total: number, booking: any) => {
      return total + (booking?.service?.price || 0); // Add price if it exists
    }, 0);
  };

  // Calculate total price for all service slots
  const totalServicePrice = calculateTotalServicePrice();
  // console.log("Total Price for All Services:", totalServicePrice);

  const onSubmit = async () => {
    const bookingIds = userPendingBookings.data.map(
      (booking: any) => booking._id
    );
    try {
      const paymentData = {
        customerId: userId,
        bookingIds,
        amount: calculateTotalServicePrice(),
      };
      // console.log(paymentData);

      const res = await createPayment({ token, paymentData });
      // console.log(res);
      if (res?.data?.success) {
        window.location.href = res?.data?.data?.paymentUrl;
      } else {
        console.log("Payment Failed");
      }

      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="container mx-auto mb-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        {isLoading ? ( // Replace `loading` with your actual loading state
          <Spinner name="Booking" />
        ) : uniqueServices?.length > 0 ? (
          <div className="flex items-start flex-col lg:flex-row gap-5 ">
            {/* Left Sidebar */}
            <div className="w-[290px] sm:w-[350px] semi-sm:w-[400px] md:w-[730px] lg:w-[350px] bg-[#FFFFFF] shadow-lg rounded-[5px] pb-5 mt-12 mx-auto">
              <ul>
                {uniqueServices?.map(
                  (booking: TServiceBookingData, index: number) => (
                    <li
                      key={index}
                      className={`cursor-pointer p-2 transition-colors duration-200  ${
                        selectedService === booking?.service?.name
                          ? "text-[#EE3131] font-medium bg-[#F75D342E] border-l-4 border-[#EE3131]"
                          : "text-[#777777]"
                      } hover:text-[#EE3131] hover:bg-[#F75D342E]`}
                      onClick={() => setSelectedService(booking?.service?.name)}
                      onMouseEnter={() =>
                        setHoveredService(booking?.service?.name)
                      }
                      onMouseLeave={() => setHoveredService(null)}
                    >
                      <div className="flex items-center gap-3 py-2 px-2">
                        <img
                          src={booking?.service?.icon}
                          alt=""
                          style={{
                            filter:
                              selectedService === booking?.service?.name ||
                              hoveredService === booking?.service?.name
                                ? "invert(33%) sepia(83%) saturate(7498%) hue-rotate(346deg) brightness(99%) contrast(107%)"
                                : "invert(31%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(60%) contrast(85%)",
                          }}
                        />
                        <p className="font-poppins text-lg">
                          {booking?.service?.name}
                        </p>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Slot Details */}
            <div className="w-full lg:w-3/4 relative">
              {selectedService ? (
                <div className="mx-6 lg:mx-auto">
                  <h3 className="text-2xl font-poppins font-semibold text-[#333] mb-6">
                    Slots for {selectedService}
                  </h3>
                  {selectedServiceSlots?.length > 0 ? (
                    <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-6">
                      {selectedServiceSlots.map(
                        (slot: TSlotBookingData, index: number) => (
                          <li
                            key={index}
                            onClick={() =>
                              setSelectedSlot({
                                startTime: slot?.slot?.startTime || "",
                                endTime: slot?.slot?.endTime || "",
                              })
                            }
                            className="relative group p-5 border border-gray-200 rounded-lg shadow-md bg-white hover:bg-gradient-to-r hover:from-[#F75D34] hover:to-[#EE3131] transition-all duration-300"
                          >
                            {/* Date and Time */}
                            <div className="text-center mb-4">
                              <p className="text-lg font-semibold text-gray-700 group-hover:text-white">
                                {slot?.slot?.date
                                  ? new Intl.DateTimeFormat("en-US", {
                                      month: "short",
                                      day: "2-digit",
                                      year: "numeric",
                                    }).format(new Date(slot.slot.date))
                                  : ""}
                              </p>
                              <p className="text-sm text-gray-500 group-hover:text-gray-100">
                                {slot?.slot?.startTime}
                              </p>
                            </div>

                            {/* Location */}
                            <div className="flex justify-center items-center gap-2">
                              <BsFillPersonLinesFill />
                              <button className="border px-2 py-1 font-poppins text rounded-sm bg-[#34D399] text-white">
                                Booked
                              </button>
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p className="text-gray-500 font-poppins flex items-center justify-center mt-20">
                      No slots available for this service.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 font-poppins flex items-center justify-center mt-20">
                  Please select a service to view slots.
                </p>
              )}
            </div>

            {/* User Information */}
            <div className="mx-3 semi-sm:mx-6">
              <h1 className="font-poppins text-2xl semi-sm:text-4xl font-semibold">
                User Information
              </h1>
              <div className="mb-4 mt-5">
                <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                  User Name
                </h2>
                <input
                  className="pt-3 pb-3 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[370px] md:w-[461px] mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                  type="text"
                  id=""
                  value={user?.user?.name || ""}
                  placeholder="User Name"
                />
              </div>
              <div className="mb-4 mt-5">
                <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                  User Email
                </h2>
                <input
                  className="pt-3 pb-3 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[370px] md:w-[461px] mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                  type="text"
                  id=""
                  value={user?.user?.email || ""}
                  placeholder="User Email"
                />
              </div>
              <div className="flex items-center flex-col md:flex-row gap-5 w-full">
                <div className="">
                  <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                    Start Time
                  </h2>
                  <input
                    className="pt-3 pb-3 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[370px] md:w-[218px] mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                    type="text"
                    id=""
                    value={selectedSlot?.startTime || ""}
                    placeholder="Start Time"
                  />
                </div>
                <div>
                  <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                    End Time
                  </h2>
                  <input
                    className="pt-3 pb-3 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[370px] md:w-[218px] mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                    type="text"
                    id=""
                    value={selectedSlot?.endTime || ""}
                    placeholder="End Time"
                  />
                </div>
              </div>
              <div className="mb-4 mt-5">
                <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                  Price
                </h2>
                <input
                  className="pt-3 pb-3 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[370px] md:w-[461px] mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                  type="text"
                  id=""
                  value={totalServicePrice || ""}
                  placeholder="User Email"
                />
              </div>
              <div className="flex justify-center mt-10">
                <Button
                  className="px-8 py-5 w-40 bg-[#43B9B2] font-poppins font-medium text-white rounded-md text-lg"
                  htmlType="submit"
                >
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Message when no bookings are found
          <div className="flex justify-center items-center h-[500px]">
            <p className="text-gray-500 text-2xl font-poppins">
              No Booking Found.
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Booking;
