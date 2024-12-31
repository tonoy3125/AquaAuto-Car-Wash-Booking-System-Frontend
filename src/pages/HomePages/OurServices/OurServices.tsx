import { FaLongArrowAltRight } from "react-icons/fa";

const OurServices = () => {
  return (
    <div className="relative">
      <div className="min-h-[1350px] relative">
        {/* Image Container with Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://i.ibb.co.com/Sx9pdVR/Mask-Group-1.png)",
            backgroundSize: "100% 100%", // Ensures the background image covers the entire area
            backgroundPosition: "center", // Centers the image within the container
            backgroundRepeat: "no-repeat", // Prevents the image from repeating
          }}
        >
          {/* Background Color Overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "rgba(255, 192, 203, 0.2)", // Adjust RGBA values for your desired color and opacity
            }}
          ></div>

          {/* Content Container with Padding */}
          <div className="relative z-10 pt-28">
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
              <div className="flex  gap-5">
                <div>
                  <div>
                    <img
                      className="w-[370px] "
                      src="https://i.ibb.co.com/5hx3Rpt/Rectangle-6298-2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="bg-[#EE3232] w-[370px] px-8 py-16 relative">
                    <div className="z-20">
                      <h1 className="text-white font-poppins text-3xl font-medium mb-10">
                        Hand car
                      </h1>
                      <p
                        className="font-poppins text-base mb-10 text-white "
                        style={{ lineHeight: "1.8" }}
                      >
                        There are many variations passages of Lorem Ipsum
                        available, but the main majority…
                      </p>
                      <button className="flex items-center gap-2 text-white font-poppins ">
                        <span className="text-base font-medium cursor-pointer">
                          Learn More
                        </span>
                        <FaLongArrowAltRight className="text-lg" />
                      </button>
                    </div>
                    <div className="absolute top-0 z-0">
                      <img
                        src="https://i.ibb.co.com/p2kNQWF/Mask-Group-5.png"
                        alt=""
                      />
                    </div>

                    <div className="absolute top-[-45px] right-[22px] z-0">
                      <div className="bg-white w-[90px] h-[90px] rounded-full flex items-center justify-center shadow-lg">
                        <img
                          className="w-[45%] h-[45%]"
                          src="https://i.ibb.co/KmXXDzD/Ser-01-1.png"
                          alt="Service Icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-6 mb-32">
                    <div className="relative">
                      <div>
                        <img
                          className="w-[380px] h-[305px]"
                          src="https://i.ibb.co.com/99BBpdV/Rectangle-6298-2-1.jpg"
                          alt=""
                        />
                      </div>
                      <div className="bg-[#fff] w-[350px] px-6 py-8 absolute -bottom-24 right-0">
                        <div>
                          <h1 className="text-[#1E1E1E] font-poppins text-[22px] font-medium mb-4">
                            Self-service facilities
                          </h1>
                          <p
                            className="font-poppins text-base mb-4 text-[#626472]"
                            style={{ lineHeight: "1.8" }}
                          >
                            There are many variations passages of Lorem Ipsum
                            available, but the main majority…
                          </p>
                          <button className="flex items-center gap-2 text-[#EE3232] font-poppins ">
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
                              src="https://i.ibb.co.com/pZM6snz/Ser-02.png"
                              alt="Service Icon"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div>
                        <img
                          className="w-[380px] h-[305px]"
                          src="https://i.ibb.co.com/s62qHgh/Rectangle-1217-4.png"
                          alt=""
                        />
                      </div>
                      <div className="bg-[#fff] w-[350px] px-6 py-8 absolute -bottom-24 right-0">
                        <div>
                          <h1 className="text-[#1E1E1E] font-poppins text-[22px] font-medium mb-4">
                            Tunnel Washes
                          </h1>
                          <p
                            className="font-poppins text-base mb-4 text-[#626472]"
                            style={{ lineHeight: "1.8" }}
                          >
                            There are many variations passages of Lorem Ipsum
                            available, but the main majority…
                          </p>
                          <button className="flex items-center gap-2 text-[#EE3232] font-poppins ">
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
                              src="https://i.ibb.co.com/SvYSgMZ/ser-03.png"
                              alt="Service Icon"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="relative">
                      <div>
                        <img
                          className="w-[380px] h-[305px]"
                          src="https://i.ibb.co.com/YBFxBPQ/Rectangle-1217-2-1.png"
                          alt=""
                        />
                      </div>
                      <div className="bg-[#fff] w-[350px] px-6 py-8 absolute -bottom-24 right-0">
                        <div>
                          <h1 className="text-[#1E1E1E] font-poppins text-[22px] font-medium mb-4">
                            Self-service facilities
                          </h1>
                          <p
                            className="font-poppins text-base mb-4 text-[#626472]"
                            style={{ lineHeight: "1.8" }}
                          >
                            There are many variations passages of Lorem Ipsum
                            available, but the main majority…
                          </p>
                          <button className="flex items-center gap-2 text-[#EE3232] font-poppins ">
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
                              src="https://i.ibb.co.com/2cjgMrs/ser-04.png"
                              alt="Service Icon"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div>
                        <img
                          className="w-[380px] h-[305px]"
                          src="https://i.ibb.co.com/gFtNytp/Rectangle-1217.png"
                          alt=""
                        />
                      </div>
                      <div className="bg-[#fff] w-[350px] px-6 py-8 absolute -bottom-24 right-0">
                        <div>
                          <h1 className="text-[#1E1E1E] font-poppins text-[22px] font-medium mb-4">
                            Self-service facilities
                          </h1>
                          <p
                            className="font-poppins text-base mb-4 text-[#626472]"
                            style={{ lineHeight: "1.8" }}
                          >
                            There are many variations passages of Lorem Ipsum
                            available, but the main majority…
                          </p>
                          <button className="flex items-center gap-2 text-[#EE3232] font-poppins ">
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
                              src="https://i.ibb.co.com/0cnWfwy/ser-05.png"
                              alt="Service Icon"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -top-[132px] right-0">
        <img src="https://i.ibb.co.com/xsmYy6x/Group-598.jpg" alt="" />
      </div>
    </div>
  );
};

export default OurServices;
