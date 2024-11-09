import { AiOutlineMenu } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";
import { Player } from "@lottiefiles/react-lottie-player";
import { FaCartPlus, FaRegCircleUser } from "react-icons/fa6";
import { IoMailUnreadOutline } from "react-icons/io5";
import { CiFacebook, CiLinkedin, CiTwitter, CiYoutube } from "react-icons/ci";

const HomePageNavbar = () => {
  return (
    <div className="relative ">
      <div className="min-h-[750px] relative">
        {/* Image Container with Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://i.ibb.co.com/sWVH74j/carspa-banner-scaled-1.jpg)",
            backgroundSize: "cover", // Ensures the background image covers the entire area
            backgroundPosition: "center", // Centers the image within the container
            backgroundRepeat: "no-repeat", // Prevents the image from repeating
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(1, 84, 150, 0.5), rgba(1, 84, 150, 0))",
            }}
          ></div>
        </div>

        {/* Content Container */}
        <div className="relative ">
          <div className="border-b-[1px] pb-5">
            <div className="pt-5 md:px-7 lg:px-0 lg:max-w-5xl mx-auto flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between">
              <div className="flex items-center gap-2 ">
                <IoMailUnreadOutline className="text-2xl text-white" />
                <p className="text-base font-poppins font-medium text-white">
                  aquaauto@abcd.com
                </p>
              </div>
              <div>
                <p className="text-base font-poppins font-medium text-white">
                  +8899555578883
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  <CiTwitter className="text-2xl text-white" />
                </span>
                <span>
                  <CiFacebook className="text-2xl text-white" />
                </span>
                <span>
                  <CiYoutube className="text-2xl text-white" />
                </span>
                <span>
                  <CiLinkedin className="text-2xl text-white" />
                </span>
              </div>
            </div>
          </div>
          <div className="navbar pt-5 pb-3 pr-3 container mx-auto">
            <div className="navbar-start ml-5 md:ml-0">
              <div className="dropdown font-poppins top-0 z-50">
                <div className="drawer lg:hidden">
                  <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label
                      htmlFor="my-drawer-2"
                      className="drawer-button lg:hidden"
                    >
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                      >
                        <AiOutlineMenu className="text-2xl font-bold text-white"></AiOutlineMenu>
                      </div>
                    </label>
                  </div>
                  <div className="drawer-side">
                    <label
                      htmlFor="my-drawer-2"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <ul className="p-4 w-72 min-h-full bg-base-200 text-base-content">
                      {/* Sidebar content here */}

                      <NavLink to="/services">
                        <li className="hover:text-[#0E82FD] pt-2 pb-2 font-medium border-b-2 text-[#1F2937]">
                          <a>Services</a>
                        </li>
                      </NavLink>
                      <NavLink to="/booking">
                        <li className="hover:text-[#0E82FD] pt-2 pb-2 font-medium border-b-2 text-[#1F2937]">
                          <a>Booking</a>
                        </li>
                      </NavLink>
                      <NavLink to="/gallery">
                        <li className="hover:text-[#0E82FD] pt-2 pb-2 font-medium border-b-2 text-[#1F2937]">
                          <a>Gallery</a>
                        </li>
                      </NavLink>
                      <NavLink to="/about-us">
                        <li className="hover:text-[#0E82FD] pt-2 pb-2 font-medium border-b-2 text-[#1F2937]">
                          <a>About Us</a>
                        </li>
                      </NavLink>
                      <NavLink to="/contact-us">
                        <li className="hover:text-[#0E82FD] pt-2 pb-2 font-medium border-b-2 text-[#1F2937]">
                          <a>Contact Us</a>
                        </li>
                      </NavLink>
                      <NavLink to="/dashboard">
                        <li className="hover:text-[#0E82FD] pt-2 pb-2 font-medium border-b-2 text-[#1F2937]">
                          <a>Dashboard</a>
                        </li>
                      </NavLink>
                    </ul>
                  </div>
                </div>
              </div>
              <NavLink
                to="/"
                className="flex items-center justify-center normal-case pl-4 sm:pl-10 md:pl-7 lg:pl-0"
              >
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
                  <span className=" xs:text-base sm:text-lg semi-sm:text-xl md:text-xl lg:text-2xl font-barlow font-bold text-[#fff]">
                    AquaAuto
                  </span>
                </span>
              </NavLink>
            </div>
            <div className="navbar-center font-poppins hidden lg:flex">
              <ul className=" flex items-center gap-7">
                {/* <NavLink to="/">
              <li className="hover:text-[#0E82FD] font-medium text-[#1F2937]">
                <a>Home</a>
              </li>
            </NavLink> */}

                <NavLink to="/services">
                  <li className="hover:text-[#0E82FD] font-poppins font-medium text-[#fff]">
                    <a>Services</a>
                  </li>
                </NavLink>
                <NavLink to="/booking">
                  <li className="hover:text-[#0E82FD] font-poppins font-medium text-[#fff]">
                    <a>Booking</a>
                  </li>
                </NavLink>
                <NavLink to="/gallery">
                  <li className="hover:text-[#0E82FD] font-poppins font-medium text-[#fff]">
                    <a>Gallery</a>
                  </li>
                </NavLink>
                <NavLink to="/about-us">
                  <li className="hover:text-[#0E82FD] font-poppins font-medium text-[#fff]">
                    <a>About Us</a>
                  </li>
                </NavLink>
                <NavLink to="/contact-us">
                  <li className="hover:text-[#0E82FD] font-poppins font-medium text-[#fff]">
                    <a>Contact Us</a>
                  </li>
                </NavLink>
                <NavLink to="/dashboard">
                  <li className="hover:text-[#0E82FD] font-poppins font-medium text-[#fff]">
                    <a>Dashboard</a>
                  </li>
                </NavLink>
              </ul>
            </div>
            <div className="navbar-end gap-3 md:gap-5 mr-0 sm:mr-1 md:mr-4 lg:mr-0">
              <NavLink to="/login">
                <span>
                  <FaRegCircleUser className="text-2xl text-white lg:text-white" />
                </span>
              </NavLink>
              <span>
                <FaCartPlus className="text-2xl text-white lg:text-white" />
              </span>
              <span>
                <MdNotificationsActive className="text-2xl text-white lg:text-white" />
              </span>
            </div>
          </div>
          <div
            className="pt-20 lg:pt-28 container mx-auto xs:pl-5 sm:pl-5 semi-sm:pl-4 md:pl-7 lg:pl-0 "
            style={{ lineHeight: "1.5", letterSpacing: "1px" }}
          >
            <h5 className="text-sm lg:text-base font-ubuntu text-white font-semibold pb-3 semi-sm:pb-4">
              Aqua Auto / Car Wash
            </h5>
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold font-poppins text-white  pb-2 semi-sm:pb-4">
              Best Car Service in
            </h1>
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-poppins font-semibold text-white  pb-1">
              The World
            </h1>
            <div className="">
              <p
                className="text-white text-lg font-poppins font-semibold pt-2 "
                style={{ lineHeight: "1.8", letterSpacing: "1px" }}
              >
                Quality car wash services that bring out{" "}
                <br className="xs:hidden md:block lg:hidden " /> the best in
                your vehicle. <br className="hidden lg:block" /> Professional
                washes <br className="xs:hidden md:block lg:hidden" /> for a
                fresh look, inside and out.
              </p>
            </div>
          </div>
          <div className="absolute -bottom-12 lg:-bottom-4">
            <img src="https://i.ibb.co.com/Z24Rbv5/Ellipse-12-1.png" alt="" />
          </div>
        </div>
      </div>
      <div className="container lg:max-w-6xl mx-auto ">
        <div className="absolute -bottom-[750px] sm:-bottom-[800px] semi-sm:-bottom-[700px] md:-bottom-40 lg:-bottom-44 grid grid-cols-1 md:grid-cols-3 gap-5 items-center mx-5 md:ml-5 lg:ml-0">
          <div className="bg-[#282828] px-6 py-8 sm:px-8 sm:py-10 md:w-[230px] lg:w-[380px] md:px-2 md:py-5 lg:px-8 lg:py-10 rounded-lg relative">
            <img
              src="https://i.ibb.co.com/ggMvwJr/automatic-transmission-1.png"
              alt=""
            />
            <h1 className="text-xl font-poppins text-white mt-5 ">
              Modern Workshop
            </h1>
            <p
              className="font-poppins text-base text-white mt-2"
              style={{ lineHeight: "1.5", letterSpacing: "1px" }}
            >
              Elements blocks from a range cate gories to build pages that
            </p>
            <div className="absolute right-0 bottom-0">
              <img src="https://i.ibb.co.com/1rdGjDg/bg1-1.png" alt="" />
            </div>
          </div>
          <div className="bg-[#2B6BE8] px-6 py-8 sm:px-8 sm:py-10 md:w-[230px] lg:w-[380px] md:px-2 md:py-5 lg:px-8 lg:py-10 rounded-lg relative">
            <img src="https://i.ibb.co.com/MDmryB9/worker-1.png" alt="" />
            <h1 className="text-xl font-poppins text-white mt-5 ">
              Talented Workers
            </h1>
            <p
              className="font-poppins text-base text-white mt-2"
              style={{ lineHeight: "1.5", letterSpacing: "1px" }}
            >
              Elements blocks from a range cate gories to build pages that
            </p>
            <div className="absolute right-0 bottom-0">
              <img src="https://i.ibb.co.com/VDM2Dr5/bg2.png" alt="" />
            </div>
          </div>
          <div className="bg-[#EE3131] px-6 py-8 sm:px-8 sm:py-10 md:w-[230px] lg:w-[380px] md:px-2 md:py-5 lg:px-8 lg:py-10 rounded-lg relative">
            <img
              src="https://i.ibb.co.com/9tVhw5J/augmented-reality-1.png"
              alt=""
            />
            <h1 className="text-xl font-poppins text-white mt-5 ">
              Modern Workshop
            </h1>
            <p
              className="font-poppins text-base text-white mt-2"
              style={{ lineHeight: "1.5", letterSpacing: "1px" }}
            >
              Elements blocks from a range cate gories to build pages that
            </p>
            <div className="absolute right-0 bottom-0">
              <img src="https://i.ibb.co.com/RTXZ9rT/bg3.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-4 bottom-14 sm:left-4 sm:bottom-14 semi-sm:left-4 semi-sm:bottom-16 md:left-5 lg:left-28 md:bottom-20 lg:-bottom-40">
        <img src="https://i.ibb.co.com/k19zcSv/Group-539-1.png" alt="" />
      </div>
      <div className="absolute right-4 bottom-24 sm:right-4 sm:bottom-28 semi-sm:right-4 semi-sm:bottom-32 md:right-10 lg:right-28 md:bottom-24 lg:-bottom-32">
        <img src="https://i.ibb.co.com/hVbkVm2/Group-1.png" alt="" />
      </div>
    </div>
  );
};

export default HomePageNavbar;
