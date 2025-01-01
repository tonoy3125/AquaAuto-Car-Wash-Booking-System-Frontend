import { useGetAllServicesQuery } from "@/redux/features/services/serviceApi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OurServices = () => {
  const navigate = useNavigate();
  const queryParams = {};

  const { data: serviceData } = useGetAllServicesQuery(queryParams);
  console.log(serviceData);

  const handleLearnMore = (serviceName) => {
    navigate(`/services?=${serviceName}`);
  };

  return (
    <div className="relative">
      <div className="min-h-[2920px] sm:min-h-[2900px] semi-sm:min-h-[2950px] md:min-h-[2900px] lg:min-h-[1350px] relative">
        {/* Image Container with Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://i.ibb.co.com/Sx9pdVR/Mask-Group-1.png)",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Background Color Overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "rgba(255, 192, 203, 0.2)",
            }}
          ></div>

          {/* Content Container with Padding */}
          <div className="relative z-10 pt-16 semi-sm:pt-28">
            <h1 className="text-4xl font-bold text-center text-[#1E1E1E] font-poppins">
              Our Services
            </h1>
            <hr className="bg-[#EE3131] h-1 w-12 mx-auto mt-5" />
            <p className="font-poppins font-medium mt-5 text-[#626472] flex items-start lg:items-center justify-center lg:justify-center text-center mb-20">
              We bring innovative strategies and cohesive designs to elevate
              your brand’s identity. <br className="hidden md:block" />
              Our approach involves collaboration and creativity to bring your
              vision to life.
            </p>
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5">
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:mb-32">
                    {serviceData?.data?.map((service) => (
                      <div className="relative mb-24">
                        <div>
                          <img
                            className="w-[300px] sm:w-[350px] semi-sm:w-[380px] h-[305px]"
                            src={service?.image}
                            alt=""
                          />
                        </div>
                        <div className="bg-[#fff] w-[270px] sm:w-[320px] semi-sm:w-[350px] px-6 py-8 absolute -bottom-24 right-0">
                          <div>
                            <h1 className="text-[#1E1E1E] font-poppins text-[22px] font-medium mb-4">
                              {service?.name}
                            </h1>
                            <p
                              className="font-poppins text-base mb-4 text-[#626472]"
                              style={{ lineHeight: "1.8" }}
                            >
                              {service?.description
                                ?.split(" ")
                                .slice(0, 14)
                                .join(" ")}
                              ...
                            </p>
                            <button
                              onClick={() => handleLearnMore(service.name)}
                              className="flex items-center gap-2 text-[#EE3232] font-poppins "
                            >
                              <span className="text-base font-medium cursor-pointer">
                                Learn More
                              </span>
                              <FaLongArrowAltRight className="text-lg" />
                            </button>
                          </div>

                          <div className="absolute top-[-45px] right-[22px] z-0">
                            <div className="bg-[#EE3232] w-[90px] h-[90px] rounded-full flex items-center justify-center shadow-lg">
                              <img
                                className="w-[45%] h-[45%]"
                                src={service?.icon}
                                alt="Service Icon"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -top-[132px] right-0 hidden md:block">
        <img src="https://i.ibb.co.com/xsmYy6x/Group-598.jpg" alt="" />
      </div>
    </div>
  );
};

export default OurServices;
