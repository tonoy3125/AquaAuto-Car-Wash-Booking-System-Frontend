import { RiArrowDropRightLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const ContactUsBanner = () => {
  return (
    <div className="w-full pb-20 pt-5">
      <div className="border relative">
        <img
          className="w-full h-[70vh] lg:h-[40vh]  object-cover"
          src="https://i.ibb.co.com/tPwYbnd/blog-details-img.jpg"
          alt=""
        />
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="text-white absolute top-28 md:top-24 lg:top-32  w-full ">
          <div className="flex flex-col lg:justify-between items-center">
            <h1 className="text-2xl lg:text-[34px] font-semibold font-poppins mb-5">
              Contact Us
            </h1>
            <div
              className="flex items-center text-base gap-1 lg:text-lg font-semibold font-poppins text-[#ffffff]"
              style={{ lineHeight: "1.6", letterSpacing: "0.025em" }}
            >
              <NavLink to="/">
                <p className=" font-poppins text-base ">Home</p>
              </NavLink>
              <span>
                <RiArrowDropRightLine className="text-3xl font-bold" />
              </span>
              <p className="font-poppins text-base ">Contact Us</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsBanner;
