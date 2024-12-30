import { GiCheckMark } from "react-icons/gi";
import "./History.css";

const History = () => {
  return (
    <div className="mt-10 md:mt-20 lg:max-w-6xl mx-auto relative mb-12 md:mb-14 lg:mb-60">
      <div className="flex flex-col lg:flex-row md:items-start lg:items-center lg:justify-between gap-52 sm:gap-40 semi-sm:gap-32 md:gap-20 lg:gap-0 relative mx-3 sm:mx-4 semi-sm:mx-5 lg:mx-0 pb-[500px] sm:pb-[600px] md:pb-[470px] lg:pb-0">
        {/* Main Image */}

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
        {/* Main image */}
        <div className="absolute right-6 top-[520px] sm:right-6 sm:top-[500px] semi-sm:right-7 semi-sm:top-[460px] md:right-[300px] lg:right-[180px] md:top-[350px] lg:top-0 z-20 animate-up-down">
          <img
            src="https://i.ibb.co.com/HtgbPVX/Rectangle-770-2-1-1.jpg"
            alt=""
          />
        </div>
        {/* Main Image 2 */}
        <div className="absolute right-2 top-[650px] sm:right-2 sm:top-[680px] semi-sm:right-2 semi-sm:top-[665px] md:right-28 md:top-[470px] lg:right-0 lg:top-[105px] z-10 animate-up-down">
          <img
            src="https://i.ibb.co.com/d4sMqxX/Rectangle-771-2-1-1.jpg"
            alt=""
          />
        </div>
        {/* Sub Image 1 */}
        <div className="absolute right-10 top-16 hidden lg:block">
          <img
            src="https://i.ibb.co.com/kJ8ppgx/Rectangle-20-copy-3-1.png"
            alt=""
          />
        </div>
        {/* Sub Image 2 */}
        <div className="absolute right-48 -bottom-[185px] hidden lg:block">
          <img
            src="https://i.ibb.co.com/kJ8ppgx/Rectangle-20-copy-3-1.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default History;
