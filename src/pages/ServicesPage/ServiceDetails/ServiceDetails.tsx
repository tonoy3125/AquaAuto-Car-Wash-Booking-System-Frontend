import { DatePicker } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import "./ServiceDetails.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useGetAllSlotByServiceIdQuery } from "@/redux/features/slot/slotApi";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ServiceDetails = ({ service }) => {
  // console.log(service);
  const id = service?._id;
  const [activeTab, setActiveTab] = useState(1);
  const [isMonchecked, setIsMonChecked] = useState(true);
  const [isTuechecked, setIsTueChecked] = useState(true);
  const [isWedchecked, setIsWedChecked] = useState(true);
  const [isThuchecked, setIsThuChecked] = useState(true);
  const [isFrichecked, setIsFriChecked] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<{
    date: string;
    startTime: string;
  } | null>(null);

  const { data: slotData } = useGetAllSlotByServiceIdQuery(id!);
  // console.log(slotData);

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  const disablePastDates = (current) => {
    // Disable past dates
    return current && current < new Date().setHours(0, 0, 0, 0);
  };

  const totalTabs = 5; // Total number of tabs
  const progressWidth = (activeTab / totalTabs) * 100;

  const groupSlotsByDate = (slots) => {
    return slots.reduce((grouped, slot) => {
      const date = slot.date; // Assuming `slot.date` contains the date in format: "Mon Nov 25"
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(slot);
      return grouped;
    }, {});
  };

  // Process your slot data
  const slotDataGrouped = groupSlotsByDate(slotData?.data || []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short", // 'Mon', 'Tue', 'Wed', etc.
      month: "short", // 'Nov', 'Dec', etc.
      day: "numeric", // '25', '26', etc.
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
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
        <form>
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
                  >
                    <option value="">Select Category</option>
                    <option value="Minutes">Repair</option>
                  </select>
                </div>
                <div>
                  <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                    Service
                  </h2>
                  <input
                    className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#C0C0C0] font-poppins rounded-lg outline-none"
                    type="text"
                    id=""
                    placeholder="Enter Your Service"
                  />
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
                      onChange={handleEmployeeChange}
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
                    >
                      <option value="8.00 AM">8.00 am</option>
                      <option value="9.00 AM">9.00 am</option>
                      <option value="10.00 AM">10.00 am</option>
                      <option value="11.00 AM">11.00 am</option>
                      <option value="12.00 PM">12.00 pm</option>
                      <option value="1.00 PM">1.00 pm</option>
                      <option value="2.00 PM">2.00 pm</option>
                      <option value="3.00 PM">3.00 pm</option>
                      <option value="4.00 PM">4.00 pm</option>
                      <option value="5.00 PM">5.00 pm</option>
                      <option value="6.00 PM">6.00 pm</option>
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
                      defaultValue="6.00 PM"
                    >
                      <option value="8.00 AM">8.00 am</option>
                      <option value="9.00 AM">9.00 am</option>
                      <option value="10.00 AM">10.00 am</option>
                      <option value="11.00 AM">11.00 am</option>
                      <option value="12.00 PM">12.00 pm</option>
                      <option value="1.00 PM">1.00 pm</option>
                      <option value="2.00 PM">2.00 pm</option>
                      <option value="3.00 PM">3.00 pm</option>
                      <option value="4.00 PM">4.00 pm</option>
                      <option value="5.00 PM">5.00 pm</option>
                      <option value="6.00 PM">6.00 pm</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <p className="font-poppins text-base text-[#fff] mb-2">
                      Mon
                    </p>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
                        isMonchecked ? "bg-orange-500" : "bg-orange-500"
                      }`}
                      onClick={() => setIsMonChecked(!isMonchecked)}
                    >
                      {isMonchecked && (
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
                  <div>
                    <p className="font-poppins text-base text-[#fff] mb-2">
                      Tue
                    </p>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
                        isTuechecked ? "bg-orange-500" : "bg-orange-500"
                      }`}
                      onClick={() => setIsTueChecked(!isTuechecked)}
                    >
                      {isTuechecked && (
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
                  <div>
                    <p className="font-poppins text-base text-[#fff] mb-2">
                      Wed
                    </p>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
                        isWedchecked ? "bg-orange-500" : "bg-orange-500"
                      }`}
                      onClick={() => setIsWedChecked(!isWedchecked)}
                    >
                      {isWedchecked && (
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
                  <div>
                    <p className="font-poppins text-base text-[#fff] mb-2">
                      Thu
                    </p>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
                        isThuchecked ? "bg-orange-500" : "bg-orange-500"
                      }`}
                      onClick={() => setIsThuChecked(!isThuchecked)}
                    >
                      {isThuchecked && (
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
                  <div>
                    <p className="font-poppins text-base text-[#fff] mb-2">
                      Fri
                    </p>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
                        isFrichecked ? "bg-orange-500" : "bg-orange-500"
                      }`}
                      onClick={() => setIsFriChecked(!isFrichecked)}
                    >
                      {isFrichecked && (
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
                </div>
              </div>
            )}
            {activeTab === 2 && (
              <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 border-b-[1px] border-b-[#e5e7eb] pb-10">
                <div>
                  <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                    Vehicle Type
                  </h2>
                  <input
                    className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#C0C0C0] font-poppins rounded-lg outline-none"
                    type="text"
                    id=""
                    placeholder="Enter Your Vehicle Type"
                  />
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
                  />
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
                  />
                </div>
                <div>
                  <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                    Manufacturing Year
                  </h2>
                  <input
                    className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#C0C0C0] font-poppins rounded-lg outline-none"
                    type="text"
                    id=""
                    placeholder="Enter Your Manufacturing Year"
                  />
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
                  />
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
                      {slots?.map((slot, index) => (
                        <button
                          key={slot.startTime}
                          className={`time-slot-btn ${
                            selectedSlot?.date === slot.date &&
                            selectedSlot?.startTime === slot.startTime
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedSlot({
                              date: slot.date, // assuming slot has a `date` field
                              startTime: slot.startTime,
                            });
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
                                {slot?.startTime}
                              </Label>
                            </div>
                          </RadioGroup>
                        </button>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 4 && (
              <div className="border-b-[1px] border-b-[#e5e7eb] pb-10">
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
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-center md:justify-between gap-5 md:gap-0">
            {/* Back button */}
            {activeTab > 1 && (
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceDetails;
