import { Card, CardContent } from "@/components/ui/card";
import { GiAlarmClock } from "react-icons/gi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUpcomingBookingsByUserIdQuery } from "@/redux/features/bookings/bookingsApi";
import { useAppSelector } from "@/redux/hooks";
import { TUserPayload } from "@/types";
import { getTimeRemaining } from "@/utils/getTimeRemaining";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import "./UpcomingBookings.css";
import Spinner from "@/components/Spinner/Spinner";
const UpcomingBookings = () => {
  const [countdowns, setCountdowns] = useState<
    Record<
      string,
      { days: number; hours: number; minutes: number; seconds: number }
    >
  >({});
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const userId = user?.id;

  // Fetch upcoming bookings for the user
  const {
    data: bookings,
    refetch,
    isLoading,
  } = useGetUpcomingBookingsByUserIdQuery(userId!);

  useEffect(() => {
    if (!bookings || bookings.length === 0) return;

    const updateCountdowns = () => {
      const newCountdowns: Record<
        string,
        { days: number; hours: number; minutes: number; seconds: number }
      > = {};

      let refetchNeeded = false; // Flag to track if a refetch is needed

      bookings?.data?.forEach((booking: any) => {
        const { date, startTime } = booking.slot;
        const slotStartDateTime = new Date(
          `${date.split("T")[0]} ${startTime}`
        );

        // Update countdown for each booking by its unique ID
        const timeRemaining = getTimeRemaining(slotStartDateTime);

        if (
          timeRemaining.days === 0 &&
          timeRemaining.hours === 0 &&
          timeRemaining.minutes === 0 &&
          timeRemaining.seconds === 0
        ) {
          refetchNeeded = true; // Set flag to refetch if countdown reaches zero
        }

        newCountdowns[booking._id] = timeRemaining;
      });

      setCountdowns(newCountdowns);

      if (refetchNeeded) {
        refetch(); // Trigger refetch if countdown reaches zero for any booking
      }
    };

    updateCountdowns();
    const intervalId = setInterval(updateCountdowns, 1000);

    return () => clearInterval(intervalId);
  }, [bookings, refetch]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Spinner name="Upcoming Booking" />
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <p className="font-poppins text-base text-center">
        No upcoming bookings found.
      </p>
    );
  }

  return (
    <div className="mt-7 lg:mt-0 md:p-10" style={{ height: "100vh" }}>
      {bookings?.data?.map((booking: any) => {
        const { days, hours, minutes, seconds } = countdowns[booking._id] || {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };

        return (
          <Card key={booking._id} className="mb-4">
            <CardContent className="flex flex-col gap-4 p-5">
              <h3 className="text-lg font-poppins font-semibold">
                {booking.service?.name || "Service Name"}
              </h3>

              <div className="text-sm font-poppins  flex-col flex gap-[5px]">
                <p className="font-medium">
                  Date:{" "}
                  {format(
                    new Date(booking.slot?.date || "11-11-2020"),
                    "MMM dd yyyy"
                  )}
                </p>
                <p className="font-medium">
                  Time: {booking.slot?.startTime || "N/A"}
                </p>
                <div className="flex items-center gap-2 shrink-0">
                  <GiAlarmClock className="text-xl rotate-clock" />
                  <span>
                    {days}d {hours}h {minutes}m {seconds}s
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default UpcomingBookings;
