import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { TUserPayload } from "@/types";
import { Player } from "@lottiefiles/react-lottie-player";
import { AiOutlineMenu } from "react-icons/ai";
import { FaCartPlus, FaRegCircleUser } from "react-icons/fa6";
import { MdNotificationsActive } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  return (
    <div className="navbar pt-5 pb-3 pr-3 container mx-auto">
      <div className="navbar-start ml-5 md:ml-0">
        <div className="dropdown font-poppins top-0 z-50">
          <div className="drawer lg:hidden">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              {/* Page content here */}
              <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <AiOutlineMenu className="text-2xl font-bold"></AiOutlineMenu>
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
            <span className=" xs:text-base sm:text-lg semi-sm:text-xl md:text-xl lg:text-2xl font-barlow font-bold ">
              AquaAuto
            </span>
          </span>
        </NavLink>
      </div>
      <div className="navbar-center font-poppins hidden lg:flex">
        <ul className=" flex items-center gap-7">
          <NavLink to="/services">
            <li className="hover:text-[#0E82FD] font-poppins font-medium text-[#1F2937]">
              <a>Services</a>
            </li>
          </NavLink>
          <NavLink to="/booking">
            <li className="hover:text-[#0E82FD] font-poppins font-medium text-[#1F2937]">
              <a>Booking</a>
            </li>
          </NavLink>
          <NavLink to="/about-us">
            <li className="hover:text-[#0E82FD] font-poppins font-medium text-[#1F2937]">
              <a>About Us</a>
            </li>
          </NavLink>
          <NavLink to="/contact-us">
            <li className="hover:text-[#0E82FD] font-poppins font-medium text-[#1F2937]">
              <a>Contact Us</a>
            </li>
          </NavLink>
          {/* Conditionally render dashboard based on user role */}
          {user?.user?.role === "admin" ? (
            <NavLink to="/admin/dashboard">
              <li className="hover:text-[#0E82FD] font-poppins font-medium text-[#1F2937]">
                Admin Dashboard
              </li>
            </NavLink>
          ) : user?.user?.role === "user" ? (
            <NavLink to="/user/dashboard">
              <li className="hover:text-[#0E82FD] font-poppins font-medium text-[#1F2937]">
                User Dashboard
              </li>
            </NavLink>
          ) : null}
        </ul>
      </div>
      <div className="navbar-end gap-2 sm:gap-3 md:gap-5 mr-0 sm:mr-1 md:mr-4 lg:mr-0">
        {user ? (
          <Link to="/account">
            <FaRegCircleUser className="text-2xl " />
          </Link>
        ) : (
          <Link to="/login">
            <FaRegCircleUser className="text-2xl " />
          </Link>
        )}
        <span>
          <FaCartPlus className="text-2xl text-[#1F2937]" />
        </span>
        <span>
          <MdNotificationsActive className="text-2xl text-[#1F2937]" />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
