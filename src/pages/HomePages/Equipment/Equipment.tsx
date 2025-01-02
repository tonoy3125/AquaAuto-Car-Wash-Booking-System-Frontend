import { IoIosArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";

const Equipment = () => {
  return (
    <div className="mt-[850px] sm:mt-[900px] semi-sm:mt-[800px] md:mt-72 mb-28 sm:mb-40 md:mb-20 lg:mb-20">
      <div className="flex flex-col lg:flex-row items-center justify-between mx-5 lg:mx-0">
        <div className="lg:w-[50%] lg:pl-48">
          <div className="flex items-center mb-10">
            <h3
              className="relative text-[#E81C2E] font-barlow font-bold uppercase pl-28 before:content-[''] before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:bg-[#E81C2E] before:h-px before:w-20 before:mr-4"
              style={{ lineHeight: "1.2", letterSpacing: "6px" }}
            >
              Modern Equipment
            </h3>
          </div>
          <h1
            className="font-poppins text-2xl semi-sm:text-3xl md:text-4xl font-semibold text-start"
            style={{ lineHeight: "1.3" }}
          >
            Professional washing and <br className="hidden md:block" /> cleaning
            of your car
          </h1>
          <p
            className="font-poppins font-medium mt-5 semi-sm:mt-7"
            style={{ lineHeight: "1.6" }}
          >
            Expert Car Washing and Cleaning We provide professional services{" "}
            <br className="hidden md:block" />
            to make your car look clean, shiny, and like new. Leave your car{" "}
            <br className="hidden md:block" />
            sparkling clean with our expert services.
          </p>
          <h3 className="mt-7 mb-7 semi-sm:mt-10 semi-sm:mb-10">
            <span className="text-[#19191B] font-poppins text-2xl font-semibold">
              Call for book :{" "}
            </span>
            <span className="text-[#E81C2E] font-poppins text-2xl font-semibold">
              8-800-10-500
            </span>
          </h3>
          <Link to="/services">
            <button className="font-poppins border px-5 py-2 rounded-md text-white bg-[#E81C2E] text-base flex items-center gap-5">
              Book Now
              <IoIosArrowDropright className="text-xl" />
            </button>
          </Link>
        </div>
        <div className="lg:w-[50%] overflow-hidden">
          <img
            className="hidden lg:block lg:max-w-[1600px]"
            src="https://i.ibb.co.com/0Fv423x/washer.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Equipment;
