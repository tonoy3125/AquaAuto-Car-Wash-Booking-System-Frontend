import { GiCheckMark } from "react-icons/gi";

const Experience = () => {
  return (
    <div className=" lg:max-w-6xl mx-auto relative mb-12 md:mb-14 lg:mb-60">
      <div className="flex flex-col lg:flex-row md:items-start lg:items-center lg:justify-between gap-52 sm:gap-40 semi-sm:gap-32 md:gap-20 lg:gap-0 relative mx-5 lg:mx-0">
        {/* Main Image */}
        <div className="relative z-10">
          <img src="https://i.ibb.co.com/c88xRc8/Rectangle-744-1.png" alt="" />
        </div>
        <div>
          <div className="flex items-center">
            <h3
              className="relative text-[#E81C2E] font-barlow font-bold uppercase pl-28 before:content-[''] before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:bg-[#E81C2E] before:h-px before:w-20 before:mr-4"
              style={{ lineHeight: "1.2", letterSpacing: "6px" }}
            >
              Servicing since 1986
            </h3>
          </div>
          <p className="font-poppins font-medium mt-10">
            With Over 35 Years of Experience, We've Been Proudly Delivering{" "}
            <br className="hidden md:block" />
            Exceptional Service and Expertise Since 1986, Building Trust and{" "}
            <br /> Quality in Every Project
          </p>
          <div className="space-y-5 mt-12">
            <div className="flex items-center gap-3">
              <div className="border border-[#EE3131] xs:w-8 sm:w-7 h-5 semi-sm:w-6 md:w-6 md:h-6 flex items-center justify-center rounded-full">
                <GiCheckMark className="text-[#EE3131]" />
              </div>
              <p className="font-poppins font-medium text-[#626472]">
                Committed to excellence in every service we provide
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="border border-[#EE3131] xs:w-8 sm:w-7 h-5 semi-sm:w-6 md:w-6 md:h-6 flex items-center justify-center rounded-full">
                <GiCheckMark className="text-[#EE3131]" />
              </div>
              <p className="font-poppins font-medium text-[#626472]">
                Dedicated to building lasting relationships with our clients
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="border border-[#EE3131] xs:w-8 sm:w-7 h-5 semi-sm:w-6 md:w-6 md:h-6 flex items-center justify-center rounded-full">
                <GiCheckMark className="text-[#EE3131]" />
              </div>
              <p className="font-poppins font-medium text-[#626472]">
                Expertise in delivering solutions tailored to your needs
              </p>
            </div>
          </div>
        </div>
        {/* Sub Image */}
        <div className="absolute sm:-left-4 sm:bottom-[770px] semi-sm:-left-4 semi-sm:bottom-[730px] md:-left-3 lg:-left-20 md:bottom-[315px] lg:-bottom-12 z-0">
          <img src="https://i.ibb.co.com/HnrkdPN/Group.png" alt="" />
        </div>
      </div>
      {/* Experience Image */}
      <div className="relative z-20">
        <div className="absolute bg-[#EE3131] bottom-[485px] left-5 sm:bottom-[463px] sm:left-5 semi-sm:bottom-[432px] semi-sm:left-5 md:bottom-[355px] lg:-bottom-24 md:left-[275px] lg:left-60">
          <img
            className="w-[280px] sm:w-[335px] semi-sm:w-[385px] md:w-[400px] lg:w-full h-[220px] md:h-[235px] lg:h-full"
            src="https://i.ibb.co.com/MkRqJxH/Asset-1-2-1.png"
            alt=""
          />
        </div>
        <div className="absolute left-[30px] bottom-[535px] sm:left-[55px] sm:bottom-[510px] semi-sm:left-[80px] md:left-[345px] lg:left-[320px] semi-sm:bottom-[480px] md:bottom-[390px] lg:-bottom-6">
          <h1 className="text-8xl semi-sm:text-8xl md:text-9xl font-poppins font-bold text-white text-center">
            35
          </h1>
          <h1
            className="text-2xl font-poppins font-bold text-white text-center"
            style={{ lineHeight: "1.2", letterSpacing: "1px" }}
          >
            Years of <br className="hidden lg:block" /> Experience
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Experience;
