import { Player } from "@lottiefiles/react-lottie-player";
import { useState } from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiMenuUnfold3Line } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";

const UserDashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="flex">
      {/* Drawer */}
      <div className="flex">
        {/* Drawer toggle button */}
        <button
          onClick={handleToggle}
          className={`absolute top-0 left-0 inline-block p-4 transition-all duration-500  ${
            isOpen ? "rotate-180 left-60 sm:left-64 lg:left-80" : ""
          }`}
        >
          <RiMenuUnfold3Line className="text-2xl" />
        </button>

        {/* Sidebar Drawer */}
        <div
          className={`fixed top-0 left-0 z-20 w-60 sm:w-64 lg:w-80 h-full transition-transform duration-500 bg-white shadow-lg ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-6 py-4 border-b-[1px] mb-3">
            <NavLink
              to="/"
              className="flex items-center justify-center normal-case "
            >
              <Player
                className="w-28"
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
                <span className=" text-2xl font-barlow font-bold ">
                  AquaAuto
                </span>
              </span>
            </NavLink>
          </div>
          <div>
            <h3 className="font-poppins text-base lg:text-lg font-medium text-[#E81C2E] px-6 mt-5 mb-5">
              User Dashboard Menu
            </h3>
            <ul className="menu mb-8 text-sm">
              <li>
                <NavLink
                  to="/user/dashboard/userProfile"
                  className={({ isActive }) =>
                    `flex items-center gap-[14px] px-8 py-4 group  hover:bg-gray-100 ${
                      isActive ? "text-blue-500 font-bold" : "text-gray-700"
                    }`
                  }
                >
                  <MdOutlineDashboardCustomize className="text-lg lg:text-xl" />
                  <span className="text-base lg:text-lg font-semibold">
                    User Dashboard
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content: Outlet */}
      <div
        className={`flex-1 transition-all duration-500 p-8 bg-[#F3F4F6] ${
          isOpen ? "lg:ml-80" : "ml-0"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboardLayout;
