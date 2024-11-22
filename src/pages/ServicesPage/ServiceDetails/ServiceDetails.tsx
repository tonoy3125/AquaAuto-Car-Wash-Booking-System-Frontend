import { DatePicker } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import "./ServiceDetails.css";

const ServiceDetails = () => {
  const [activeTab, setActiveTab] = useState(1);

  const [formData, setFormData] = useState({
    category: "",
    service: "",
    employee: "",
    availableDate: "",
    startTime: "",
    endTime: "",
  });

  const handleDateChange = (date, dateString) => {
    setFormData((prev) => ({
      ...prev,
      availableDate: dateString,
    }));
  };

  const disablePastDates = (current) => {
    // Disable past dates
    return current && current < new Date().setHours(0, 0, 0, 0);
  };

  const totalTabs = 5; // Total number of tabs
  const progressWidth = (activeTab / totalTabs) * 100;

  const handleNext = () => {
    // // Validate current tab fields before moving to the next tab
    // if (activeTab === 1) {
    //   if (!formData.category || !formData.service || !formData.employee) {
    //     alert("Please fill out all fields in the current tab.");
    //     return;
    //   }
    // }
    // if (activeTab === 2) {
    //   if (!formData.availableDate || !formData.startTime || !formData.endTime) {
    //     alert("Please fill out all fields in the current tab.");
    //     return;
    //   }
    // }

    setActiveTab((prev) => prev + 1); // Move to the next tab
  };

  const handleBack = () => {
    setActiveTab((prev) => prev - 1); // Go back to the previous tab
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-[#171717] mt-10 mb-10">
      <div className="max-w-6xl mx-auto pt-16 pb-16">
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
                className={`py-2 px-16 font-poppins text-lg font-medium flex items-center justify-center ${
                  tabIndex === activeTab
                    ? "text-[#E43337]" // Current tab
                    : tabIndex < activeTab
                    ? "text-red-500" // Previous tabs
                    : "text-[#fff]" // Upcoming tabs
                }`}
                onClick={() => setActiveTab(tabIndex)}
              >
                {`${tabIndex}. ${
                  ["Service", "Time", "Details", "Payment", "Done"][index]
                }`}
              </button>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-6xl h-[5px] rounded-xl bg-[#bec3c7] relative">
          <div
            className="h-full bg-red-500 rounded-xl transition-all duration-300"
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 1 && (
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                  Category
                </h2>
                <select
                  className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#fff] font-poppins rounded-lg outline-none"
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
                  className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#fff] font-poppins rounded-lg outline-none"
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
                    className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#fff] font-poppins rounded-lg outline-none"
                    id=""
                  >
                    <option value="">Any</option>
                    <option value="Minutes">Sazid</option>
                    <option value="Hours">Tamim</option>
                    <option value="Hours">Rifat</option>
                    <option value="Hours">Migdad</option>
                    <option value="Hours">Dipu</option>
                    <option value="Hours">Murad</option>
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
                    color: "#fff",
                    border: "1px solid #454545",
                  }}
                  onChange={handleDateChange}
                  allowClear
                  disabledDate={disablePastDates}
                  className="datepicker-custom"
                />
              </div>
              <div>
                <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                  Start from
                </h2>
                <input
                  className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#fff] font-poppins rounded-lg outline-none"
                  type="text"
                  id=""
                  placeholder="Enter Your Service"
                />
              </div>
              <div>
                <h2 className="text-lg font-normal text-[#fff] mb-3 font-poppins">
                  Finish by
                </h2>
                <div>
                  <select
                    className="pt-3 pb-3 pl-3 w-full mx-auto border-[#454545] border-[1px] bg-[#2E2E2E] text-[#fff] font-poppins rounded-lg out"
                    id=""
                  >
                    <option value="">Any</option>
                    <option value="Minutes">Sazid</option>
                    <option value="Hours">Tamim</option>
                    <option value="Hours">Rifat</option>
                    <option value="Hours">Migdad</option>
                    <option value="Hours">Dipu</option>
                    <option value="Hours">Murad</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div>
              <h2 className="text-white text-xl mb-4">Select a time:</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300">Available Date</label>
                  <input
                    type="date"
                    name="availableDate"
                    className="w-full p-2 bg-gray-800 text-white rounded"
                    value={formData.availableDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-300">Start From</label>
                  <input
                    type="time"
                    name="startTime"
                    className="w-full p-2 bg-gray-800 text-white rounded"
                    value={formData.startTime}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-300">Finish By</label>
                  <input
                    type="time"
                    name="endTime"
                    className="w-full p-2 bg-gray-800 text-white rounded"
                    value={formData.endTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}
          {/* Add additional tabs as needed */}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {activeTab > 1 && (
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded"
              onClick={handleBack}
            >
              Back
            </button>
          )}
          {activeTab < 4 && (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
