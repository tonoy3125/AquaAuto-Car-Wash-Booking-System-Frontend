import { setUser } from "@/redux/features/auth/authSlice";
import { useUpdateUserByIdMutation } from "@/redux/features/user/userApi";
import { TUserUpdateProfileProps } from "@/types/userData.type";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const UserUpdateProfile: React.FC<TUserUpdateProfileProps> = ({
  user,
  onClose,
  token,
  currentUser,
}) => {
  console.log(user);
  const id = user?.data?._id;
  const [loading, setLoading] = useState<boolean>(false);
  const [updateUserById] = useUpdateUserByIdMutation();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Update form values when `user` data changes
  useEffect(() => {
    if (user?.data) {
      console.log("user data", user);
      reset({
        name: user.data.name || "",
        email: user.data.email || "",
        phone: user.data.phone || "",
        address: user.data.address || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Uploading Service...");

    const userInfo = { ...data };

    try {
      const res = await updateUserById({ token, userInfo, id }).unwrap();
      // console.log(res);
      toast.success(res.message || "Profile Updated Successfully", {
        id: toastId,
        duration: 3000,
      });
      dispatch(
        setUser({
          user: {
            ...currentUser,
            user: {
              ...currentUser?.user,
              ...data, // Update only the fields from the response
            },
          },
          token,
        })
      );
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  return (
    <div>
      <>
        <Modal
          style={{ fontFamily: "fon" }}
          title={
            <span style={{ fontFamily: "Poppins" }}>
              {loading ? "Loading Modal" : "Update Profile"}
            </span>
          }
          footer={null}
          open={true} // Always open when rendered
          onCancel={onClose}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <div className="mb-4">
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                Name
              </h2>
              <input
                className="pt-3 pb-3 pl-3 w-full mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                type="text"
                id=""
                placeholder="Enter Your Name"
                {...register("name", {
                  required: "Name is Required",
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm font-poppins font-medium pt-2">
                  {String(errors.name.message)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                Email
              </h2>
              <input
                className="pt-3 pb-3 pl-3 w-full mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                type="text"
                id=""
                placeholder="Enter Your Email Address"
                {...register("email", {
                  required: "Email is Required",
                })}
              />
            </div>
            <div className="mb-4">
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                Phone
              </h2>
              <input
                className="pt-3 pb-3 pl-3 w-full mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                type="text"
                id=""
                placeholder="Enter Your Phone"
                {...register("phone", {
                  required: "Phone is Required",
                })}
              />
            </div>
            <div className="mb-4">
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                Address
              </h2>
              <input
                className="pt-3 pb-3 pl-3 w-full mx-auto border-[#dae1e3] border-[1px] bg-[#fff] text-[#1D1D1F] font-poppins rounded-lg focus:outline focus:outline-1 focus:outline-[#0d6efd] transition-all duration-700 ease-in-out"
                type="text"
                id=""
                placeholder="Enter Your Address"
                {...register("address", {
                  required: "Address is Required",
                })}
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button
                className="px-8 py-5 w-40 bg-[#43B9B2] font-poppins font-medium text-white rounded-md text-lg"
                htmlType="submit"
                loading={loading}
              >
                Submit
              </Button>
            </div>
          </form>
        </Modal>
      </>
    </div>
  );
};

export default UserUpdateProfile;
