import { useEffect, useState } from "react";
import { useGetUpcomingBookingsByUserIdQuery } from "@/redux/features/bookings/bookingsApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { getTimeRemaining } from "@/utils/getTimeRemaining";
import { TUserPayload } from "@/types";

const NavbarCountdown = () => {
  const [nextSlotCountdown, setNextSlotCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const userId = user?.id;

  const { data: bookings } = useGetUpcomingBookingsByUserIdQuery(userId!);

  useEffect(() => {
    if (!bookings || bookings.length === 0) return;

    const nextSlot = bookings?.data
      .filter((booking: any) => {
        const { date, startTime } = booking.slot;
        return new Date(`${date.split("T")[0]} ${startTime}`) > new Date();
      })
      .sort((a: any, b: any) => {
        const aTime = new Date(
          `${a.slot.date.split("T")[0]} ${a.slot.startTime}`
        );
        const bTime = new Date(
          `${b.slot.date.split("T")[0]} ${b.slot.startTime}`
        );
        return aTime.getTime() - bTime.getTime();
      })[0];

    if (!nextSlot) return;

    const slotStartDateTime = new Date(
      `${nextSlot.slot.date.split("T")[0]} ${nextSlot.slot.startTime}`
    );

    const updateCountdown = () => {
      setNextSlotCountdown(getTimeRemaining(slotStartDateTime));
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [bookings]);

  const { days, hours, minutes, seconds } = nextSlotCountdown;

  return (
    <div className="text-base font-poppins font-medium text-white">
      Next Booking: {days}d {hours}h {minutes}m {seconds}s
    </div>
  );
};

export default NavbarCountdown;
