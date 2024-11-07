import { Player } from "@lottiefiles/react-lottie-player";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#020D26] pb-5">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-7 md:gap-0 border-b-[1px] pt-20 pb-10 px-5 lg:px-0">
        <NavLink to="/" className="flex items-center normal-case">
          <Player
            className="xs:w-20 sm:w-20 semi-sm:w-28"
            autoplay
            loop
            src="https://lottie.host/3062c462-5ba9-4514-be8a-5596b6e7d13b/A35r1DKuEc.json"
          ></Player>
          <span
            className="text-black font-semibold hover:"
            style={{
              whiteSpace: "nowrap",
              letterSpacing: "0.2em",
            }}
          >
            <span className=" xs:text-base sm:text-lg semi-sm:text-xl md:text-xl lg:text-3xl font-barlow font-bold text-[#fff]">
              AquaAuto
            </span>
          </span>
        </NavLink>
        <h1 className="md:text-lg lg:text-4xl text-white font-poppins font-bold">
          WELCOME TO CAR WASH AND SERVICE
        </h1>
      </div>
      <div className="container mx-auto mt-14 border-b-[1px] pb-10">
        <div className="flex flex-col lg:flex-row items-start justify-between">
          <div className="pl-5 lg:pl-0">
            <h1 className="md:text-lg lg:text-3xl text-white font-poppins font-bold mb-7">
              STAY UP TO DATE WITH <br /> ORISON CHURCH
            </h1>
            <form className="pb-8 lg:pb-0">
              <fieldset className="form-control w-[300px] sm:w-80">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your Email Address"
                    className="w-[250px] sm:w-[345px] semi-sm:w-[380px] md:w-[450px] px-2 sm:px-5 py-4 text-white bg-[#FFFFFF33] sm:text-base font-poppins outline-none border border-[#FFFFFF33] "
                  />
                  <button className="py-[17px] px-3 sm:px-10 bg-[#0068D7] text-white absolute top-0 right-3 sm:right-0 md:-right-10 rounded-l-none font-poppins uppercase">
                    Sign Up
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-5 px-5 lg:px-0">
            <div>
              <h3 className="font-poppins font-bold text-2xl text-white mb-3">
                Useful Links
              </h3>
              <p className="font-poppins text-base font-medium text-white mb-3">
                About Us
              </p>
              <p className="font-poppins text-base font-medium text-white mb-3">
                Our Service
              </p>
              <p className="font-poppins text-base font-medium text-white mb-3">
                Contact Us
              </p>
              <p className="font-poppins text-base font-medium text-white mb-3">
                Blog
              </p>
            </div>
            <div>
              <h3 className="font-poppins font-bold text-2xl text-white mb-3">
                CONTECT INFO
              </h3>
              <p className="font-poppins text-base font-medium text-white mb-3">
                Address:
              </p>
              <p className="font-poppins text-base font-medium text-white mb-3">
                1095 howard street,san francisco, USA
              </p>
              <p className="font-poppins text-base font-medium text-white mb-3">
                Email:
              </p>
              <p className="font-poppins text-base font-medium text-white mb-3">
                info@peacefulqode.com
              </p>
            </div>
            <div>
              <h3 className="font-poppins font-bold text-2xl text-white mb-3">
                OPENING HOURS
              </h3>
              <p className="font-poppins text-base font-medium text-white mb-3">
                Monday - Friday
              </p>
              <p className="font-poppins text-base font-medium text-white mb-3">
                09:00 AM - 06:00 PM
              </p>
              <p className="font-poppins text-base font-medium text-white mb-3">
                Saturday
              </p>
              <p className="font-poppins text-base font-medium text-white mb-3">
                10:00 AM - 05:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
      <h3 className="font-poppins text-base text-white text-center mt-5">
        Proudly powered by Aqua Auto
      </h3>
    </div>
  );
};

export default Footer;
