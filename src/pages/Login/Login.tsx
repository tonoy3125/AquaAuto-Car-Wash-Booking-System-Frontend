import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { Player } from "@lottiefiles/react-lottie-player";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { setUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging In...");
    try {
      const userInfo = {
        email: data?.email,
        password: data?.password,
      };
      console.log(userInfo);
      const res = await login(userInfo).unwrap();
      console.log(res);
      const user = verifyToken(res.accessToken);
      // console.log(user);
      dispatch(
        setUser({ user: { user, id: res.data._id }, token: res.accessToken })
      );
      toast.success(res.message || "Logged In Successfully!j", {
        id: toastId,
        duration: 3000,
      });
      // navigate("/account");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row items-center gap-10 md:gap-16 lg:gap-40">
      <div className="relative lg:w-[50%] lg:h-[911px]">
        <img
          className="w-full h-full"
          src="https://i.ibb.co/BwwfvMk/side-view-cropped-unrecognizable-business-people-working-common-desk-1.jpg"
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full bg-[#0d6efd] bg-opacity-40"></div>

        <div className="absolute inset-0 md:left-7 lg:left-40 flex flex-col justify-center items-center md:items-start lg:w-[730px] px-2 md:px-0 mt-12 sm:mt-10 semi-sm:mt-5 md:mt-0">
          <h3 className="font-poppins font-bold text-3xl md:text-5xl text-white text-center md:text-start mb-6">
            Welcome back!
          </h3>
          <p
            className="font-poppins semi-sm:text-sm md:text-xl text-white text-center md:text-start  mb-4"
            style={{ letterSpacing: ".4px" }}
          >
            We are glad to see you again! Get access to your Orders, Wishlist
            and Recommendations.
          </p>
        </div>
        <div className="absolute inset-0 md:top-5 lg:top-10 lg:left-36">
          <Link
            to="/"
            className="flex items-center justify-center md:justify-start normal-case  md:pl-7 lg:pl-0"
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
          </Link>
        </div>
      </div>
      <div className="pb-10 lg:pb-0">
        <h3 className="font-poppins font-bold text-3xl md:text-3xl text-black mb-6">
          Log In
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <h2 className="text-base font-normal text-[#4c4d4d] mb-3  font-poppins">
              Email Address
            </h2>
            <input
              className="pt-3 pb-3 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[630px] mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
              type="email"
              id=""
              placeholder="Enter Your Email"
              {...register("email", {
                required: "Email is Required",
              })}
            />
          </div>
          <div className="mb-4 relative">
            <h2 className="text-base font-normal text-[#4c4d4d] mb-3  font-poppins">
              Password
            </h2>
            <input
              className="pt-3 pb-3 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[630px] mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
              type={showPassword ? "text" : "password"}
              id=""
              placeholder="Enter Password"
              {...register("password", {
                required: "Password is Required",
              })}
            />
            <span
              className="absolute right-4 md:right-3 top-[52px] rtl:left-0 rtl:right-auto "
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="text-xl"></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye className="text-xl"></AiOutlineEye>
              )}
            </span>
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
            <Link to="/reset-password">
              <p
                className="text-[#0D6EFD] hover:text-[#0257d5] text-end sm:text-center font-poppins text-base mt-3 underline"
                style={{ letterSpacing: ".4px" }}
              >
                Forgot password?
              </p>
            </Link>
          </div>
          <input
            className="w-full py-3 bg-[#0d6efd] hover:bg-[#0257d5] text-base font-poppins text-[#fff] font-medium rounded-lg border border-[#43b9b2] mt-7 cursor-pointer"
            style={{ letterSpacing: ".3px" }}
            type="submit"
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
