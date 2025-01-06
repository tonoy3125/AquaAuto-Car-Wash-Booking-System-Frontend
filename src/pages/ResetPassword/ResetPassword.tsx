import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { Player } from "@lottiefiles/react-lottie-player";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [resetPassword] = useResetPasswordMutation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // Parse the query parameters
  const email = searchParams.get("email"); // Get email from URL
  const token = searchParams.get("token"); // Get token from URL
  //   console.log(token);

  const newPassword = watch("newPassword");

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Proceeding to Reset Password");
    try {
      const newUpdatedPassword = {
        token,
        newPassword: data?.newPassword,
        confirmNewPassword: data?.confirmNewPassword,
      };
      const res = await resetPassword(newUpdatedPassword).unwrap();
      console.log(res);
      const user = verifyToken(res?.data?.accessToken);
      //   console.log(user);
      dispatch(
        setUser({
          user: { user, id: res?.data?.user?._id },
          token: res?.data?.accessToken,
        })
      );
      toast.success(res.message || "Password reset to the successfully!", {
        id: toastId,
        duration: 3000,
      });
      navigate("/account");
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
            Don't worry,
          </h3>
          <p
            className="font-poppins semi-sm:text-sm md:text-xl text-white text-center md:text-start  mb-4"
            style={{ letterSpacing: ".4px" }}
          >
            We are here help you to recover your password.
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
      <div className="pb-10 lg:pb-0 px-3 semi-sm:px-4 md:px-0">
        <h3 className="font-poppins font-bold text-3xl md:text-3xl text-black mb-6">
          Reset account password
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-base font-normal text-[#4c4d4d] mb-7  font-poppins">
            Enter a new password for {email}
          </h2>
          <div className="mb-4 relative">
            <h2 className="text-base font-normal text-[#4c4d4d] mb-3  font-poppins">
              New Password
            </h2>
            <input
              className="pt-3 pb-3 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[630px] mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
              type={showNewPassword ? "text" : "password"}
              id=""
              placeholder="Enter New Password"
              {...register("newPassword", {
                required: "Password Can't be Blank.",
                minLength: {
                  value: 6,
                  message: "Password is too short (minimum is 6 characters)",
                },
              })}
            />
            <span
              className="absolute right-4 md:right-3 top-[52px] rtl:left-0 rtl:right-auto "
              onClick={() => {
                setShowNewPassword(!showNewPassword);
              }}
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible className="text-xl"></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye className="text-xl"></AiOutlineEye>
              )}
            </span>
            {errors.newPassword && (
              <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                {String(errors.newPassword.message)}
              </p>
            )}
          </div>

          <div className="mb-4 relative">
            <h2 className="text-base font-normal text-[#4c4d4d] mb-3  font-poppins">
              Confirm New Password
            </h2>
            <input
              className="pt-3 pb-3 pl-3 w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[630px] mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
              type={showConfirmNewPassword ? "text" : "password"}
              id=""
              placeholder="Enter New Password"
              {...register("confirmNewPassword", {
                required: "Password confirmation can't be blank",
                validate: (value) =>
                  value === newPassword ||
                  "The password confirmation must match the provided password",
              })}
            />
            <span
              className="absolute right-4 md:right-3 top-[52px] rtl:left-0 rtl:right-auto "
              onClick={() => {
                setShowConfirmNewPassword(!showConfirmNewPassword);
              }}
            >
              {showConfirmNewPassword ? (
                <AiOutlineEyeInvisible className="text-xl"></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye className="text-xl"></AiOutlineEye>
              )}
            </span>
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                {String(errors.confirmNewPassword.message)}
              </p>
            )}
          </div>

          <input
            className="w-[295px] sm:w-[350px] semi-sm:w-[390px] md:w-[630px] mx-auto py-3 bg-[#0d6efd] hover:bg-[#0257d5] text-base font-poppins text-[#fff] font-medium rounded-lg border border-[#43b9b2] mt-5 cursor-pointer"
            style={{ letterSpacing: ".3px" }}
            type="submit"
            value="Reset Password"
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
