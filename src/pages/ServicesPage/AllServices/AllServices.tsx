import { useGetAllServicesQuery } from "@/redux/features/services/serviceApi";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { SortOption } from "./AllService.constant";
import { debounce } from "lodash";
import Spinner from "@/components/Spinner/Spinner";

const AllServices = () => {
  const [selectedService, setSelectedService] = useState("Car Wash Lift info");
  const [hoveredService, setHoveredService] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(() => {
    // Load the saved sort option from localStorage, default to "Featured"
    return localStorage.getItem("selectedSortOption") || "Featured";
  });

  // Load the saved sort option label from localStorage
  const [selectedOption, setSelectedOption] = useState(() => {
    return localStorage.getItem("selectedSortOption") || "Featured";
  });

  const queryParams: any = {
    searchTerm,
  };

  // Add sorting
  if (sortOption === "Price, low to high") {
    queryParams.sort = "price_low_to_high";
  } else if (sortOption === "Price, high to low") {
    queryParams.sort = "price_high_to_low";
  }

  const { data: serviceData, isLoading } = useGetAllServicesQuery(queryParams);
  console.log(serviceData);

  const selectedServiceData = serviceData?.data?.find(
    (service) => service.name === selectedService
  );

  useEffect(() => {
    if (serviceData?.data?.length > 0) {
      setSelectedService(serviceData.data[0].name);
    }
  }, [serviceData]);

  useEffect(() => {
    // Save the selected sort option to localStorage whenever it changes
    localStorage.setItem("selectedSortOption", sortOption);
  }, [sortOption]);

  const handleOptionClick = (option: SortOption) => {
    setSelectedOption(option);
    localStorage.setItem("selectedSortOption", option);
    setDropdownOpen(false);

    // Update sorting in parent component
    setSortOption(option);
  };

  // Debounced search function
  const debouncedSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    debouncedSearch(value); // Call debounced function
  };

  return (
    <div className="container mx-auto mb-20">
      <div className="mx-5">
        <h3
          className="text-[#E81C2E] font-barlow font-bold text-base md:text-lg uppercase text-center"
          style={{ lineHeight: "1.2", letterSpacing: "6px" }}
        >
          Our Services
        </h3>
        <hr className="h-1 bg-[#E81C2E] w-14 mx-auto mt-4" />
        <p className="font-poppins font-medium mt-5 text-[#626472] flex items-start lg:items-center justify-center lg:justify-center text-center">
          We bring innovative strategies and cohesive designs to elevate your
          brand’s identity. <br className="hidden md:block" />
          Our approach involves collaboration and creativity to bring your
          vision to life.
        </p>
      </div>
      <div className="max-w-5xl mx-6 lg:mx-auto flex flex-col md:flex-row items-center gap-5 semi-sm:gap-7 md:gap-10 lg:gap-0 lg:justify-between mt-14 ">
        <div className="md:flex-1 lg:flex-none">
          <input
            type="text"
            className="w-[270px] sm:w-[325px] semi-sm:w-[375px] md:w-full lg:w-[350px] py-2 border border-gray-300 bg-white rounded-md font-poppins text-base px-5 outline-none"
            placeholder="Search By Service Name"
            name=""
            id=""
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>
        <div
          className="relative w-full lg:w-[280px] md:flex-1 lg:flex-none"
          onMouseEnter={() => setDropdownOpen(true)} // Open on hover
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-300 rounded cursor-pointer">
            {/* Sort Text */}
            <div className="flex items-center gap-2">
              <span className="text-[15px] text-[#EE3131] font-normal font-poppins">
                Sort by:
              </span>
              <span className="text-[15px] text-[#333333] font-normal font-poppins">
                {selectedOption}
              </span>
            </div>
            {/* Arrow Icon */}
            <MdOutlineKeyboardArrowDown className="text-lg text-[#333333]" />
          </button>

          {/* Dropdown Content */}
          {dropdownOpen && (
            <ul className="absolute top-full mt-1 left-0 bg-[#FFFFFF] z-20 w-full p-3 shadow-xl space-y-2">
              <li onClick={() => handleOptionClick("Featured")}>
                <a className="block text-[#333333] text-[15px] font-poppins font-medium hover:text-[#EE3131] cursor-pointer">
                  Featured
                </a>
              </li>
              <li onClick={() => handleOptionClick("Price, low to high")}>
                <a className="block text-[#333333] text-[15px] font-poppins font-medium hover:text-[#EE3131] cursor-pointer">
                  Price, low to high
                </a>
              </li>
              <li onClick={() => handleOptionClick("Price, high to low")}>
                <a className="block text-[#333333] text-[15px] font-poppins font-medium hover:text-[#EE3131] cursor-pointer">
                  Price, high to low
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
      {isLoading ? ( // Show loading state if data is still fetching
        <Spinner name="Services" />
      ) : serviceData?.data?.length === 0 ? (
        <div className="text-center mt-10 font-poppins text-lg text-[#626472]">
          No Service Found
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-start gap-10 mt-3 sm:mt-5 md:mt-14 max-w-5xl mx-6 lg:mx-auto">
          {/* Left side menu */}
          <div className="w-full lg:w-[350px] bg-[#FFFFFF] shadow-lg rounded-[5px] pb-5 mt-12">
            <ul>
              {serviceData?.data?.map((service, index) => (
                <li
                  key={index}
                  className={`cursor-pointer p-2 transition-colors duration-200 ${
                    selectedService === service.name
                      ? "text-[#EE3131] font-medium bg-[#F75D342E] border-l-4 border-[#EE3131]"
                      : "text-[#777777]"
                  } hover:text-[#EE3131] hover:bg-[#F75D342E]`}
                  onClick={() => setSelectedService(service.name)}
                  onMouseEnter={() => setHoveredService(service.name)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className="flex items-center gap-3 py-2 px-4">
                    <img
                      src={service.icon}
                      alt=""
                      style={{
                        filter:
                          selectedService === service.name ||
                          hoveredService === service.name
                            ? "invert(33%) sepia(83%) saturate(7498%) hue-rotate(346deg) brightness(99%) contrast(107%)" // Red color for selected or hovered
                            : "invert(31%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(60%) contrast(85%)", // Gray color for default
                      }}
                    />
                    <p className="font-poppins text-lg">{service.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side content */}
          <div className="w-full lg:w-3/4 relative">
            {/* Main Image */}
            <img
              src={selectedServiceData?.image}
              alt={selectedServiceData?.name}
              className="mt-4 w-full h-auto shadow-lg relative z-10"
            />
            <div className="absolute top-[115px] sm:top-[150px] semi-sm:top-[180px] md:top-[390px] lg:top-[360px] right-0 z-0">
              <img src="https://i.ibb.co.com/Gxz2kMX/outline.png" alt="" />
            </div>
            <div className="mt-20 flex flex-col md:flex-row items-start lg:items-center justify-between">
              <p className="font-poppins font-semibold text-xl ">
                Service Duration :{" "}
                <span className="text-[#EE3131]">
                  {selectedServiceData?.duration}
                </span>
              </p>
              <p className="font-poppins font-semibold text-xl ">
                Service Price :{" "}
                <span className="text-[#EE3131]">
                  ${selectedServiceData?.price}
                </span>
              </p>
            </div>
            <h2 className="font-poppins text-3xl font-bold mt-12">
              What Is {selectedServiceData?.name}?
            </h2>
            <p className="mt-2 font-poppins text-[#626472]">
              {selectedServiceData?.description}
            </p>
            <div>
              <h2 className="font-poppins text-3xl font-bold mt-6">
                What we offer
              </h2>
              <p className="mt-2 font-poppins text-[#626472]">
                We provide high-quality car wash services tailored to meet your
                specific needs, combining innovation, expertise, and
                eco-friendly practices.Our range of services is designed to meet
                the unique needs of each vehicle, ensuring both exceptional
                cleanliness and care
              </p>
            </div>
            {/* Sub Image */}

            {/* Suggested Service */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-14">
              {serviceData?.data
                .filter((service) => service.name !== selectedService)
                .slice(0, 4) // Limit to four services
                .map((suggestedService, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <img
                      className="w-12"
                      src={suggestedService.icon}
                      alt={suggestedService.name}
                      style={{
                        filter:
                          "invert(33%) sepia(83%) saturate(7498%) hue-rotate(346deg) brightness(99%) contrast(107%)", // Red color filter
                      }}
                    />
                    <div>
                      <p className="font-poppins font-medium text-lg text-[#1E1E1E]">
                        {suggestedService.name}
                      </p>
                      <p className="font-poppins text-base text-[#626472]">
                        {suggestedService.description
                          .split(" ")
                          .slice(0, 7)
                          .join(" ")}
                        ...
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-10">
              <button className="w-full py-2 bg-[#EE3131] font-poppins font-medium text-white text-lg rounded-lg">
                View Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllServices;
