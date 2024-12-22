import { DatePicker } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import "./ServiceDetails.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useGetAllSlotByServiceIdQuery } from "@/redux/features/slot/slotApi";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { days, TDay } from "./Service.constant";
import { useAppSelector } from "@/redux/hooks";
import moment from "moment";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { TServiceData, TSlot, TUserPayload } from "@/types";
import { useCreateBookingMutation } from "@/redux/features/bookings/bookingsApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ServiceDetails: React.FC<{ service: TServiceData }> = ({ service }) => {
  // console.log(service);
  const id = service?._id;
  const serviceName = service?.name;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);
  const [checkedDays, setCheckedDays] = useState({
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: true,
  });
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<{
    slotId: string;
    date: string;
    startTime: string;
  } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null; // Get current user's ID
  const fullName = user?.user?.name;
  const phone = user?.user?.phone;
  const email = user?.user?.email;
  const [startTime, setStartTime] = useState("08.00"); // Default startTime
  const [endTime, setEndTime] = useState("18.00"); // Default endTime
  const [debouncedStartTime, setDebouncedStartTime] = useState(startTime);
  const [debouncedEndTime, setDebouncedEndTime] = useState(endTime);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedStartTime(startTime);
      setDebouncedEndTime(endTime);
    }, 300);

    return () => clearTimeout(timer);
  }, [startTime, endTime]);

  // Memoized query parameters
  const queryParams = useMemo(
    () => ({
      startTime: moment(debouncedStartTime, "hh:mm A").format("HH:mm"),
      endTime: moment(debouncedEndTime, "hh:mm A").format("HH:mm"),
    }),
    [debouncedStartTime, debouncedEndTime]
  );
  // console.log(queryParams);

  const { data: slotData, refetch } = useGetAllSlotByServiceIdQuery({
    serviceId: id,
    args: queryParams,
  });
  // console.log(slotData);

  const [createBooking] = useCreateBookingMutation();
  const token = useAppSelector(useCurrentToken);

  const disablePastDates = (current: any) => {
    // Disable past dates
    return current && current < new Date().setHours(0, 0, 0, 0);
  };

  const totalTabs = 5; // Total number of tabs
  const progressWidth = (activeTab / totalTabs) * 100;

  const groupSlotsByDate = (slots: TSlot[]): Record<string, TSlot[]> => {
    return slots.reduce((grouped, slot) => {
      const date = slot.date; // Assuming `slot.date` contains the date in format: "Mon Nov 25"
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(slot);
      return grouped;
    }, {} as Record<string, TSlot[]>);
  };

  // Process your slot data
  const slotDataGrouped = groupSlotsByDate(slotData?.data || []);

  // console.log("slot data ", slotData?.data);

  // console.log("slot data grouped", slotDataGrouped);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short", // 'Mon', 'Tue', 'Wed', etc.
      month: "short", // 'Nov', 'Dec', etc.
      day: "numeric", // '25', '26', etc.
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const toggleDay = (day: TDay) => {
    setCheckedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  // Get the current year
  const currentYear = new Date().getFullYear();
  // Generate an array of years (e.g., last 100 years)
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Creating Booking...");
    try {
      const bookingData = {
        serviceId: id,
        slotId: selectedSlot?.slotId,
        vehicleType: data?.vehicleType,
        vehicleBrand: data?.vehicleBrand,
        vehicleModel: data?.vehicleModel,
        manufacturingYear: Number(data?.manufacturingYear),
        registrationPlate: data?.registrationPlate,
      };

      // console.log(bookingData);
      const res = await createBooking({ token, bookingData });
      toast.success(res.data?.message || "Booking Successfull!!!", {
        id: toastId,
        duration: 3000,
      });
      reset();
      setSelectedSlot(null);
      setIsBookingSuccessful(true);
      setActiveTab(5);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!", {
        id: toastId,
        duration: 3000,
      });
      setIsBookingSuccessful(false);
    }
  };

  return (
    <div className="bg-[#171717] mt-10 mb-10">
      <div className="lg:max-w-6xl lg:mx-auto pt-16 pb-16 mx-5">
        <h1 className="text-4xl font-poppins font-semibold text-white ">
          Book an appointment
        </h1>
        <p className="text-base font-poppins font-medium text-white mt-3">
          A car wash is a facility used to clean the exterior and interior
          vehicles.
        </p>

        {/* Tab Navigation */}
        <div className="flex justify-between text-white mt-14">
          {Array.from({ length: totalTabs }, (_, index) => {
            const tabIndex = index + 1;
            return (
              <button
                key={tabIndex}
                className={`py-2 lg:px-16 font-poppins text-sm sm:text-base semi-sm:text-lg font-medium flex items-center justify-center ${
                  tabIndex === activeTab
                    ? "text-[#E43337]" // Current tab
                    : tabIndex < activeTab
                    ? "text-red-500" // Previous tabs
                    : "text-[#fff]" // Upcoming tabs
                }`}
                onClick={() => setActiveTab(tabIndex)}
              >
                {`${tabIndex}. ${
                  ["Service", "Type", "Time", "Details", "Done"][index]
                }`}
              </button>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="lg:w-full lg:max-w-6xl h-[5px] rounded-xl bg-[#bec3c7] relative">
          <div
            className="h-full bg-red-500 rounded-xl transition-all duration-300"
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>

        {/* Tab Content */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-8">
            {activeTab === 1 && (
              <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 border-b-[1px] border-b-[#e5e7eb] pb-10">
                <div>
                  <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                    Category
                  </h2>
                  <select
                    className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#C0C0C0] font-poppins rounded-lg outline-none"
                    id=""
                    {...register("category", {
                      required: "Category is Required",
                    })}
                  >
                    <option value="">Select Category</option>
                    <option value="repair">Repair</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                      {String(errors.category.message)}
                    </p>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                    Service
                  </h2>
                  <input
                    className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#C0C0C0] font-poppins rounded-lg outline-none"
                    type="text"
                    id=""
                    value={serviceName}
                    placeholder="Enter Your Service"
                    {...register("serviceId", {
                      required: "Service is Required",
                    })}
                  />
                  {errors.serviceId && (
                    <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                      {String(errors.serviceId.message)}
                    </p>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                    Employee
                  </h2>
                  <div>
                    <select
                      className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#C0C0C0] font-poppins rounded-lg outline-none"
                      id=""
                      value={selectedEmployee}
                      onChange={(e) => {
                        setSelectedEmployee(e.target.value);
                      }}
                    >
                      <option value="">Any</option>
                      <option value="Sazid">Sazid</option>
                      <option value="Tamim">Tamim</option>
                      <option value="Rifat">Rifat</option>
                      <option value="Migdad">Migdad</option>
                      <option value="Dipu">Dipu</option>
                      <option value="Murad">Murad</option>
                    </select>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                    I'm available on or after
                  </h2>
                  <DatePicker
                    placeholder={dayjs().format("MMMM DD, YYYY")}
                    format="MMMM DD, YYYY"
                    style={{
                      width: "100%",
                      paddingTop: "13px",
                      paddingBottom: "13px",
                      fontFamily: "Poppins, sans-serif",
                      background: "#2E2E2E",
                      color: "#C0C0C0",
                      border: "1px solid #454545",
                    }}
                    allowClear
                    disabledDate={disablePastDates}
                    className="datepicker-custom"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                    Start from
                  </h2>
                  <div>
                    <select
                      className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#C0C0C0] font-poppins rounded-lg outline-none"
                      id=""
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    >
                      <option value="08.00">08.00 AM</option>
                      <option value="09.00">09.00 AM</option>
                      <option value="10.00">10.00 AM</option>
                      <option value="11.00">11.00 AM</option>
                      <option value="12.00">12.00 PM</option>
                      <option value="13.00">01.00 PM</option>
                      <option value="14.00">02.00 PM</option>
                      <option value="15.00">03.00 PM</option>
                      <option value="16.00">04.00 PM</option>
                      <option value="17.00">05.00 PM</option>
                      <option value="18.00">06.00 PM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                    Finish by
                  </h2>
                  <div>
                    <select
                      className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#C0C0C0] font-poppins rounded-lg outline-none"
                      id=""
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    >
                      <option value="08.00">08.00 AM</option>
                      <option value="09.00">09.00 AM</option>
                      <option value="10.00">10.00 AM</option>
                      <option value="11.00">11.00 AM</option>
                      <option value="12.00">12.00 PM</option>
                      <option value="13.00">01.00 PM</option>
                      <option value="14.00">02.00 PM</option>
                      <option value="15.00">03.00 PM</option>
                      <option value="16.00">04.00 PM</option>
                      <option value="17.00">05.00 PM</option>
                      <option value="18.00">06.00 PM</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {days.map((day) => (
                    <div key={day}>
                      <p className="font-poppins text-base text-[#fff] mb-2">
                        {day}
                      </p>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
                          checkedDays[day] ? "bg-orange-500" : "bg-orange-500"
                        }`}
                        onClick={() => toggleDay(day)}
                      >
                        {checkedDays[day] && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 2 && (
              <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 border-b-[1px] border-b-[#e5e7eb] pb-10">
                <div>
                  <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                    Vehicle Type
                  </h2>
                  <div>
                    <select
                      className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#C0C0C0] font-poppins rounded-lg outline-none"
                      id=""
                      {...register("vehicleType", {
                        required: "Vehicle Type is Required",
                      })}
                    >
                      <option value="">Select Vehicle Type</option>
                      <option value="car">Car</option>
                      <option value="truck">Truck</option>
                      <option value="SUV">SUV</option>
                      <option value="van">Van</option>
                      <option value="motorcycle">Motorcycle</option>
                      <option value="bus">Bus</option>
                      <option value="electricVehicle">Electric Vehicle</option>
                      <option value="hybridVehicle">Hybrid Vehicle</option>
                      <option value="bicycle">Bicycle</option>
                      <option value="tractor">Tractor</option>
                    </select>
                  </div>
                  {errors.vehicleType && (
                    <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                      {String(errors.vehicleType.message)}
                    </p>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                    Vehicle Brand
                  </h2>
                  <input
                    className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#C0C0C0] font-poppins rounded-lg outline-none"
                    type="text"
                    id=""
                    placeholder="Enter Your Vehicle Brand"
                    {...register("vehicleBrand", {
                      required: "Vehicle Brand is Required",
                    })}
                  />
                  {errors.vehicleBrand && (
                    <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                      {String(errors.vehicleBrand.message)}
                    </p>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                    Vehicle Model
                  </h2>
                  <input
                    className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#C0C0C0] font-poppins rounded-lg outline-none"
                    type="text"
                    id=""
                    placeholder="Enter Your Vehicle Model"
                    {...register("vehicleModel", {
                      required: "Vehicle Model is Required",
                    })}
                  />
                </div>
                <div>
                  <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                    Manufacturing Year
                  </h2>
                  <select
                    className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#C0C0C0] font-poppins rounded-lg outline-none"
                    {...register("manufacturingYear", {
                      required: "Manufacturing Year is Required",
                    })}
                  >
                    <option value="">Select Manufacturing Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {errors.manufacturingYear && (
                    <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                      {String(errors.manufacturingYear.message)}
                    </p>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                    Registration Plate
                  </h2>
                  <input
                    className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#C0C0C0] font-poppins rounded-lg outline-none"
                    type="text"
                    id=""
                    placeholder="Enter Your Registration Plate"
                    {...register("registrationPlate", {
                      required: "Registration Plate is Required",
                    })}
                  />
                  {errors.registrationPlate && (
                    <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                      {String(errors.registrationPlate.message)}
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 3 && (
              <div>
                <h4 className="font-poppins font-medium text-base text-white">
                  Below you can find a list of available time slots for{" "}
                  <span className="underline">{service?.name}</span> by{" "}
                  <span>{selectedEmployee || "Any Employee"}</span>.
                </h4>
                <h4 className="font-poppins font-medium text-base text-white">
                  Click on a time slot to proceed with booking.
                </h4>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4 mt-6">
                  {Object.entries(slotDataGrouped).map(([date, slots]) => (
                    <React.Fragment key={date}>
                      {/* Render the Date Button */}
                      <button className="date-btn" disabled>
                        {formatDate(date)}
                      </button>
                      {/* Render the Time Slots for this Date */}
                      {slots?.map((slot) => {
                        // Convert time to 12-hour format
                        const formatTime12Hour = (time: any) => {
                          const [hours, minutes] = time.split(":");
                          const dateObj = new Date();
                          dateObj.setHours(hours, minutes);
                          return dateObj.toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          });
                        };

                        const formattedTime = formatTime12Hour(slot.startTime);

                        return (
                          <button
                            type="button"
                            key={slot.startTime}
                            className={`time-slot-btn ${
                              selectedSlot?.date === slot.date &&
                              selectedSlot?.startTime === slot.startTime
                                ? "selected"
                                : ""
                            }`}
                            disabled={slot.isBooked === "booked"} // Disable if slot is booked
                            onClick={() => {
                              if (slot.isBooked !== "booked") {
                                setSelectedSlot({
                                  slotId: slot._id,
                                  date: slot.date, // assuming slot has a `date` field
                                  startTime: slot.startTime,
                                });
                              }
                            }}
                          >
                            <div
                              className={`radio-input ${
                                selectedSlot?.date === slot.date &&
                                selectedSlot?.startTime === slot.startTime
                                  ? "selected"
                                  : ""
                              }`}
                            >
                              {selectedSlot?.date === slot.date &&
                                selectedSlot?.startTime === slot.startTime && (
                                  <div className="radio-input-inner selected"></div>
                                )}
                            </div>
                            <RadioGroup
                              className="cursor-pointer"
                              defaultValue="comfortable"
                            >
                              <div className="flex items-center space-x-2">
                                <Label htmlFor={`radio-${slot.startTime}`}>
                                  {formattedTime}{" "}
                                  {/* Display time in 12-hour format */}
                                </Label>
                              </div>
                            </RadioGroup>
                          </button>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 4 && (
              <div className="border-b-[1px] border-b-[#e5e7eb] pb-10">
                <h4 className="font-poppins font-medium text-base text-white pb-1">
                  You selected a booking for{" "}
                  <span className="underline">{service?.name}</span> by{" "}
                  <span className="underline">
                    {selectedEmployee || "Any Employee"}
                  </span>{" "}
                  at{" "}
                  <span className="underline">{selectedSlot?.startTime}</span>{" "}
                  <span className="underline">
                    {dayjs(selectedSlot?.date).format("MMMM DD, YYYY")}
                  </span>
                  . The price for the service is{" "}
                  <span className="underline">${service?.price}</span>
                </h4>
                <h4 className="font-poppins font-medium text-base text-white pb-5">
                  Please provide your details in the form below to proceed with
                  booking.
                </h4>
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:pb-5">
                  <div>
                    <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                      Full Name
                    </h2>
                    <input
                      className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#C0C0C0] font-poppins rounded-lg outline-none"
                      type="text"
                      id=""
                      placeholder="Enter Your Full Name"
                      value={fullName}
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                      Phone
                    </h2>
                    <div className="flex items-center w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#C0C0C0] font-poppins rounded-lg overflow-hidden">
                      {/* Country Flag Dropdown */}
                      <div className="flex items-center bg-[#2E2E2E] px-3 py-3 border-r border-[#454545]">
                        <img
                          src="https://flagcdn.com/w40/bd.png"
                          alt="Bangladesh Flag"
                          className="w-6 h-4 rounded-sm"
                        />
                        <span className="ml-2 text-[#C0C0C0] text-sm">
                          +880
                        </span>
                        <button className="ml-2">
                          <svg
                            className="w-4 h-4 text-[#C0C0C0]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div>
                      {/* Phone Number Input */}
                      <input
                        className="flex-1 bg-transparent pl-3 py-3 outline-none"
                        type="text"
                        placeholder="01812-345678"
                        value={phone}
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                      Email
                    </h2>
                    <input
                      className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#C0C0C0] font-poppins rounded-lg outline-none"
                      type="text"
                      id=""
                      placeholder="Enter Your Email Address"
                      value={email}
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                    Notes
                  </h2>
                  <textarea
                    id="order"
                    rows={4}
                    className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#C0C0C0] font-poppins rounded-lg outline-none "
                  ></textarea>
                </div>
              </div>
            )}
            {activeTab === 5 && (
              <div className="border-b-[1px] border-b-[#e5e7eb]">
                {isBookingSuccessful ? (
                  <h4 className="font-poppins font-medium text-base text-white pb-5">
                    Thank you! Your booking is complete.
                  </h4>
                ) : (
                  <h4 className="font-poppins font-medium text-base text-white pb-5">
                    Please provide your details in the form below to proceed
                    with booking.
                  </h4>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-center md:justify-between gap-5 md:gap-0">
            {/* Back button */}
            {activeTab > 1 && activeTab < 5 && (
              <button
                type="button"
                className="px-5 sm:px-10 md:px-16 py-4 bg-[#E43337] text-white text-base rounded font-poppins font-medium flex items-center"
                onClick={() => setActiveTab((prev) => prev - 1)}
              >
                <MdKeyboardArrowLeft className="mr-2 text-xl" />
                Back
              </button>
            )}

            {/* Spacer for center alignment if no Back button */}
            {activeTab === 1 && <div className="flex-1"></div>}

            {/* Next button */}
            {activeTab < 4 && (
              <button
                type="button"
                className="px-5 sm:px-10 md:px-16 py-4 bg-[#E43337] text-white text-base rounded font-poppins font-medium flex items-center"
                onClick={() => setActiveTab((prev) => prev + 1)}
                style={{ letterSpacing: "1px" }}
              >
                Next
                <MdKeyboardArrowRight className="ml-2 text-xl" />
              </button>
            )}
            {activeTab === 4 && (
              <div>
                <button
                  type="submit"
                  className="px-5 sm:px-10 md:px-16 py-4 bg-[#E43337] text-white text-base rounded font-poppins font-medium flex items-center"
                >
                  Submit
                </button>
              </div>
            )}
            {activeTab === 5 && (
              <button
                type="button"
                className="px-5 sm:px-10 md:px-16 py-4 bg-[#E43337] text-white text-base rounded font-poppins font-medium flex items-center"
                onClick={() => navigate("/booking")} // Use your routing logic here
              >
                <MdKeyboardArrowLeft className="mr-2 text-xl" />
                Back to Booking
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceDetails;
