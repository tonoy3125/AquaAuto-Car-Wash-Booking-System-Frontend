import { Link } from "react-router-dom";
import "./Login.css";
const Login = () => {
  return (
    <div className="w-full flex items-center gap-40">
      <div className="relative w-[50%] h-[911px]">
        <img
          className="w-full h-full"
          src="https://i.ibb.co/BwwfvMk/side-view-cropped-unrecognizable-business-people-working-common-desk-1.jpg"
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full bg-[#0d6efd] bg-opacity-40"></div>
        <div className="absolute inset-0 left-40 flex flex-col justify-center items-start w-[730px] ">
          <h3 className="font-poppins font-bold text-3xl md:text-5xl text-white  mb-6">
            Welcome back!
          </h3>
          <p
            className="font-poppins semi-sm:text-sm md:text-xl text-white  mb-4"
            style={{ letterSpacing: ".4px" }}
          >
            We are glad to see you again! Get access to your Orders, Wishlist
            and Recommendations.
          </p>
        </div>
      </div>
      <div>
        <h3 className="font-poppins font-bold text-3xl md:text-3xl text-black mb-6">
          Log In
        </h3>
        <form>
          <div className="mb-5">
            <h2 className="text-base font-normal text-[#4c4d4d] mb-3  font-poppins">
              Email Address
            </h2>
            <input
              className="pt-3 pb-3 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[630px] mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
              type="email"
              id=""
              placeholder="Enter Your Email"
              // {...register("email", {
              //   required: "Email is Required",
              // })}
            />
          </div>
          <div className="mb-4">
            <h2 className="text-base font-normal text-[#4c4d4d] mb-3  font-poppins">
              Password
            </h2>
            <input
              className="pt-3 pb-3 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[630px] mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
              type="email"
              id=""
              placeholder="Enter Password"
              // {...register("email", {
              //   required: "Email is Required",
              // })}
            />
          </div>
          <div className="flex xs:flex-col sm:flex-row sm:items-center justify-between">
            <div className="checkbox-container">
              <input type="checkbox" id="rememberMe" />
              <label className="custom-checkbox" htmlFor="rememberMe"></label>
              <label
                className="checkbox-label"
                htmlFor="rememberMe"
                style={{ letterSpacing: ".4px" }}
              >
                Remember password
              </label>
            </div>
            <p
              className="text-[#0D6EFD] hover:text-[#0257d5] text-end sm:text-center font-poppins text-base mt-3 underline"
              style={{ letterSpacing: ".4px" }}
            >
              Forgot password?
            </p>
          </div>
          <input
            className="w-full py-3 bg-[#0d6efd] hover:bg-[#0257d5] text-base font-poppins text-[#fff] font-medium rounded-lg border border-[#43b9b2] mt-7 cursor-pointer"
            style={{ letterSpacing: ".3px" }}
            type="button"
            value="Login"
          />
          <p
            className=" text-center font-poppins text-base mt-6"
            style={{ letterSpacing: ".4px" }}
          >
            <span className="text-[#4c4d4d]">Don't have an account? </span>
            <Link to="/register">
              <span className="text-[#0D6EFD] cursor-pointer underline">
                {" "}
                Sign Up
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
