import { useState } from "react";

const AllServices = () => {
  const [selectedService, setSelectedService] = useState("Car Wash Lift info");
  const [hoveredService, setHoveredService] = useState(null);
  const services = [
    {
      title: "Car Wash Lift info",
      icon: "https://i.ibb.co/3zFT4Fz/download-2.png",
      image: "https://i.ibb.co/Srz8Ww3/car-wash-lift-1.jpg",
      content:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit Exercitation veniam consequat. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit Exercitation veniam consequat.",
    },
    {
      title: "Hand Car Wash",
      icon: "https://i.ibb.co/bR6FbDS/download-3.png",
      image: "https://i.ibb.co/12GfTjj/hand-car-wash.jpg",
      content: "Details about Hand Car Wash...",
    },
    {
      title: "Self Service Facilitates",
      icon: "https://i.ibb.co/smhfzy2/download-4.png",
      image: "https://i.ibb.co/xMX2yGN/Rectangle-735-1.png",
      content: "Details about Self Service Facilitates...",
    },
    {
      title: "Tunnel Washes",
      icon: "https://i.ibb.co/6JjM1CQ/download-5.png",
      image: "https://i.ibb.co/h2HyLPn/Tunnel-Wash-1.jpg",
      content: "Details about Tunnel Washes...",
    },
    {
      title: "Chemical Car Wash",
      icon: "https://i.ibb.co/smhfzy2/download-4.png",
      image: "https://i.ibb.co/RQ9rGLV/cemical-car-wash-1.jpg",
      content: "Details about Chemical Car Wash...",
    },
    {
      title: "Steam Car Wash",
      icon: "https://i.ibb.co/0fm8z3X/download-7.png",
      image: "https://i.ibb.co/47T9MmQ/steam-car-wash-1.jpg",
      content: "Details about Steam Car Wash...",
    },
  ];

  const selectedServiceData = services.find(
    (service) => service.title === selectedService
  );

  return (
    <div className="container mx-auto mb-20">
      <div className="mx-5">
        <h3
          className="text-[#E81C2E] font-barlow font-bold text-base md:text-lg uppercase text-center"
          style={{ lineHeight: "1.2", letterSpacing: "6px" }}
        >
          We are Professional
        </h3>
        <hr className="h-1 bg-[#E81C2E] w-14 mx-auto mt-4" />
        <p className="font-poppins font-medium mt-5 text-[#626472] flex items-start lg:items-center justify-center lg:justify-center text-center">
          We bring innovative strategies and cohesive designs to elevate your
          brand’s identity. <br className="hidden md:block" />
          Our approach involves collaboration and creativity to bring your
          vision to life.
        </p>
      </div>
      <div className="flex items-start gap-10 mt-14 max-w-5xl mx-auto">
        {/* Left side menu */}
        <div className="w-[350px] bg-[#FFFFFF] shadow-lg rounded-[5px] pb-5 mt-12">
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
        <div className="w-3/4">
          <img
            src={selectedServiceData.image}
            alt={selectedServiceData.title}
            className="mt-4 w-full h-auto shadow-lg"
          />
          <h2 className="font-poppins text-3xl font-bold mt-6">
            What Is {selectedServiceData.title}?
          </h2>
          <p className="mt-2 font-poppins text-[#626472]">
            {selectedServiceData.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllServices;
