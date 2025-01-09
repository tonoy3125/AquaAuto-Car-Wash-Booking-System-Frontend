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
  const [loading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(
    user?.data?.image || null
  );
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
      setCurrentImage(user.data.image || null);
    }
  }, [user, reset]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setCurrentImage(null);
    }
  };

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Updating Profile...");

    const userInfo = { ...data };
    const formData = new FormData();
    formData.append("data", JSON.stringify(userInfo));
    if (selectedImage) formData.append("image", selectedImage);

    try {
      const res = await updateUserById({ token, formData, id }).unwrap();
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
            <div className="mb-4">
              <h2 className="text-base font-normal text-[#4c4d4d] mb-3 font-poppins">
                Upload Image
              </h2>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-[#43B9B2] border-dashed rounded-lg cursor-pointer bg-[#ECF8F7] dark:hover:bg-bray-800 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-black font-poppins text-center sem">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-black font-poppins">
                      SVG, PNG, JPG or GIF
                    </p>
                  </div>
                  <input
                    className="hidden"
                    id="dropzone-file"
                    type="file"
                    name="imageFile"
                    accept="image/*" // Allow only image files
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {/* Image preview section */}
              {selectedImage && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="h-32 w-auto object-cover border border-gray-300 rounded-md"
                  />
                </div>
              )}
              {!selectedImage && currentImage && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={currentImage}
                    alt="Current"
                    className="h-32 w-auto object-cover border border-gray-300 rounded-md"
                  />
                </div>
              )}
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
