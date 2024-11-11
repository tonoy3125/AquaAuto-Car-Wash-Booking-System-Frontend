import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const AllServices = () => {
  const [selectedService, setSelectedService] = useState("Car Wash Lift info");
  const [hoveredService, setHoveredService] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Featured");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const services = [
    {
      title: "Car Wash Lift info",
      icon: "https://i.ibb.co/3zFT4Fz/download-2.png",
      image: "https://i.ibb.co/Srz8Ww3/car-wash-lift-1.jpg",
      content:
        "Our Car Wash Lift service is designed to elevate your vehicle, allowing for a more thorough wash. With advanced lift technology, we ensure a spotless clean that reaches every corner of your car. This service is perfect for customers looking for a comprehensive cleaning experience that’s gentle on their vehicle’s exterior while being effective against tough dirt and grime.",
      duration: "60 Minutes",
      price: 50,
    },
    {
      title: "Hand Car Wash",
      icon: "https://i.ibb.co/bR6FbDS/download-3.png",
      image: "https://i.ibb.co/12GfTjj/hand-car-wash.jpg",
      content:
        "Our Hand Car Wash service provides a meticulous cleaning process with the utmost attention to detail. Skilled professionals use gentle yet effective techniques to ensure every inch of your car’s surface is spotless. Ideal for those who prefer a manual touch, this service offers a superior clean while protecting your car's paint and finish.",
      duration: "45 Minutes",
      price: 70,
    },
    {
      title: "Self Service Facilitates",
      icon: "https://i.ibb.co/smhfzy2/download-4.png",
      image: "https://i.ibb.co/xMX2yGN/Rectangle-735-1.png",
      content:
        "With our Self Service Facilities, customers have the freedom to wash their cars at their own pace using our top-of-the-line equipment. Our facilities are equipped with easy-to-use washing stations, eco-friendly cleaning solutions, and all the tools needed for a quick or deep clean, giving you control over your car’s cleanliness.",
      duration: "50 Minutes",
      price: 80,
    },
    {
      title: "Tunnel Washes",
      icon: "https://i.ibb.co/6JjM1CQ/download-5.png",
      image: "https://i.ibb.co/h2HyLPn/Tunnel-Wash-1.jpg",
      content:
        "Our Tunnel Wash service provides a fast, efficient, and high-quality car wash experience. With automated cleaning systems, this service ensures a thorough wash, from start to finish, using safe, eco-friendly solutions. Ideal for customers seeking a quick wash without compromising on quality, our tunnel wash stations are both efficient and gentle on your car’s finish.",
      duration: "30 Minutes",
      price: 100,
    },
    {
      title: "Chemical Car Wash",
      icon: "https://i.ibb.co/smhfzy2/download-4.png",
      image: "https://i.ibb.co/RQ9rGLV/cemical-car-wash-1.jpg",
      content:
        "Our Chemical Car Wash uses safe, specialized cleaning solutions to remove stubborn stains, grime, and build-up. This method is particularly effective for vehicles that require an intensive cleaning, addressing both visible and hidden contaminants while ensuring the longevity of your car’s finish.",
      duration: "35 Minutes",
      price: 60,
    },
    {
      title: "Steam Car Wash",
      icon: "https://i.ibb.co/0fm8z3X/download-7.png",
      image: "https://i.ibb.co/47T9MmQ/steam-car-wash-1.jpg",
      content:
        "Our Steam Car Wash service offers an eco-friendly cleaning solution using high-temperature steam. It not only cleans but also sanitizes your car's surfaces, making it perfect for customers looking for a chemical-free option. This method is effective in removing dirt and bacteria, leaving your car pristine and hygienic.",
      duration: "25 Minutes",
      price: 40,
    },
  ];

  const selectedServiceData = services.find(
    (service) => service.title === selectedService
  );

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    localStorage.setItem("selectedSortOption", option);
    setDropdownOpen(false);

    // Update sorting in parent component
    // setSortOption(option);
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
            // value={searchInput}
            // onChange={handleSearchChange}
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
            <ul className="absolute top-full mt-1 left-0 bg-[#FFFFFF] z-10 w-full p-3 shadow-xl space-y-2">
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
      <div className="flex flex-col lg:flex-row items-start gap-10 mt-3 sm:mt-5 md:mt-14 max-w-5xl mx-6 lg:mx-auto">
        {/* Left side menu */}
        <div className="w-full lg:w-[350px] bg-[#FFFFFF] shadow-lg rounded-[5px] pb-5 mt-12">
          <ul>
            {services.map((service, index) => (
              <li
                key={index}
                className={`cursor-pointer p-2 transition-colors duration-200 ${
                  selectedService === service.title
                    ? "text-[#EE3131] font-medium bg-[#F75D342E] border-l-4 border-[#EE3131]"
                    : "text-[#777777]"
                } hover:text-[#EE3131] hover:bg-[#F75D342E]`}
                onClick={() => setSelectedService(service.title)}
                onMouseEnter={() => setHoveredService(service.title)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className="flex items-center gap-3 py-2 px-4">
                  <img
                    src={service.icon}
                    alt=""
                    style={{
                      filter:
                        selectedService === service.title ||
                        hoveredService === service.title
                          ? "invert(33%) sepia(83%) saturate(7498%) hue-rotate(346deg) brightness(99%) contrast(107%)" // Red color for selected or hovered
                          : "invert(31%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(60%) contrast(85%)", // Gray color for default
                    }}
                  />
                  <p className="font-poppins text-lg">{service.title}</p>
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
            alt={selectedServiceData?.title}
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
            What Is {selectedServiceData?.title}?
          </h2>
          <p className="mt-2 font-poppins text-[#626472]">
            {selectedServiceData?.content}
          </p>
          <div>
            <h2 className="font-poppins text-3xl font-bold mt-6">
              What we offer
            </h2>
            <p className="mt-2 font-poppins text-[#626472]">
              We provide high-quality car wash services tailored to meet your
              specific needs, combining innovation, expertise, and eco-friendly
              practices.Our range of services is designed to meet the unique
              needs of each vehicle, ensuring both exceptional cleanliness and
              care
            </p>
          </div>
          {/* Sub Image */}

          {/* Suggested Service */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-14">
            {services
              .filter((service) => service.title !== selectedService)
              .slice(0, 4) // Limit to four services
              .map((suggestedService, index) => (
                <div key={index} className="flex items-start gap-4">
                  <img
                    className="w-12"
                    src={suggestedService.icon}
                    alt={suggestedService.title}
                    style={{
                      filter:
                        "invert(33%) sepia(83%) saturate(7498%) hue-rotate(346deg) brightness(99%) contrast(107%)", // Red color filter
                    }}
                  />
                  <div>
                    <p className="font-poppins font-medium text-lg text-[#1E1E1E]">
                      {suggestedService.title}
                    </p>
                    <p className="font-poppins text-base text-[#626472]">
                      {suggestedService.content
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
    </div>
  );
};

export default AllServices;
