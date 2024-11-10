import { useNavigate } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { TUserPayload } from "@/types";

const MyAccount = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null; // Get current user's ID
  const userName = user?.user?.name;

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <div className="mt-20 mb-20">
        <h3 className="font-poppins text-lg font-medium text-[#f87f96] text-center mb-4">
          Welcome
        </h3>
        <h1
          className="text-4xl font-poppins font-medium mb-5 text-center"
          style={{ lineHeight: "1", letterSpacing: "0.025em" }}
        >
          {userName}
        </h1>
        <div className="flex items-center justify-center pb-12">
          <button
            onClick={handleLogout}
            className="text-[#1d1d1f] border border-[#e8e8e1] text-sm uppercase font-oswald py-3 px-4 bg-transparent hover:border-[#1d1d1f]"
            style={{ lineHeight: "1", letterSpacing: "0.3em" }}
          >
            Log out
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccount;
